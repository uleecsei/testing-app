const Jimp = require('jimp');
const errorHandler = require('../utils/errorHandler');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (!req.file) {
      return errorHandler(res, 400, new Error('No file'));
    }

    // const image = await Jimp.read(Buffer.from(req.file.buffer, 'base64'));
    // if (image.getWidth() > image.getHeight()) {
    //   image.resize(Jimp.AUTO, 100);
    //   image.crop(image.getWidth()/2-50, 0, 100, 100);
    // } else {
    //   image.resize(100, Jimp.AUTO);
    //   image.crop(0, image.getHeight()/2-50, 100, 100);
    // }
    // req.file = image.getBufferAsync(Jimp.AUTO);

    const file = await Jimp.read(Buffer.from(req.file.buffer, 'base64'))
    .then((image) => {
        if (image.getWidth() > image.getHeight()) {
          image.resize(Jimp.AUTO, 100);
          image.crop(image.getWidth() / 2 - 50, 0, 100, 100);
        } else {
          image.resize(100, Jimp.AUTO);
          image.crop(0, image.getHeight() / 2 - 50, 100, 100);
        }
        return image.getBufferAsync(Jimp.AUTO);
      }
    )
    .catch(error => {
      errorHandler(res, 500, error);
    });
    
    req.file = file;

    next();
  } catch (e) {
    errorHandler(res, 500, e);
  }
};
