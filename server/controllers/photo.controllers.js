const AWS = require('aws-sdk');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
require("dotenv").config();

const s3BucketParams = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

module.exports.postPicture = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: 'User is not registered.',
      });
    }

    const file = req.file;
    if(!file) {
      return res.status(409).json({
        status: 'File was not attached',
      });
    }

    const s3bucket = new AWS.S3(s3BucketParams);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: userId + '_' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    if(user.profilePicture && user.s3Key) {
      s3bucket.deleteObject({
        Bucket: params.Bucket,
        Key: user.s3Key
      }, (error) => {
        if (error) {
          return errorHandler(res, 400, e);
        }
      }); 
    }

    s3bucket.upload(params, (error) => {
      if (error) {
        return errorHandler(res, 500, e);
      }
    });

    const s3FileUrl = process.env.AWS_UPLOADED_FILE_URL_LINK;
    const profilePicture = s3FileUrl + params.Key 
    await User.findByIdAndUpdate(
      userId, {
        profilePicture,
        s3Key: params.Key,
      },
    );

    res.status(200).json({
      status: 'Profile photo uploaded successfully',
      profilePicture,
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
}


module.exports.deletePicture = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!(user.profilePicture && user.s3Key)) {
      return res.status(200).json({
        status: 'Profile photo was deleted already',
      });
    }

    if (user.profilePicture && !user.s3Key) {
      await User.findByIdAndUpdate(
        userId,
        {profilePicture: null},
      );
      return res.status(200).json({
        status: 'Profile photo deleted successfully',
      });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: user.s3Key,
    };

    const s3bucket = new AWS.S3(s3BucketParams);

    await User.findByIdAndUpdate(
      userId,
      {profilePicture: null, s3Key: null},
    );

    s3bucket.deleteObject(params, (error) => {
      if (error) {
        return errorHandler(res, 400, e);
      }
    });

    res.status(200).json({
      status: 'Profile photo deleted successfully',
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
}
