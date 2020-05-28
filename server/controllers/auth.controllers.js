const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const googleVerify = require('../utils/googleVerify');

require("dotenv").config();

getToken = (user) => {
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

module.exports.login = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();

    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        status: 'User has not been found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'Password incorrect',
      });
    }

    const token = getToken(user);

    res.status(200).json({
      status: 'User authenticated successfully',
      token: `Bearer ${token}`,
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.googleLogin = async (req, res) => {
  try {
    const payload = await googleVerify(req.body.id_token);

    const user = await User.findOne({googleId: payload.sub});

    if (user) {
      const token = getToken(user);
      return res.status(200).json({
        status: 'User authenticated successfully',
        token: `Bearer ${token}`,
      });
    }

    const candidate = await User.findOne({email: payload.email});

    if (candidate) {
      const profilePicture = candidate.profilePicture ? 
            candidate.profilePicture : 
            payload.picture;

      await candidate.update({googleId: payload.sub, profilePicture});
      await candidate.save();

      const token = getToken(candidate);
      return res.status(200).json({
        status: 'User authenticated successfully',
        token: `Bearer ${token}`,
      });
    }

    const newUser = new User({
      googleId: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      profilePicture: payload.picture
    });

    const savedUser = await newUser.save();

    const token = getToken(savedUser);
    res.status(200).json({
      status: 'User authenticated successfully',
      token: `Bearer ${token}`,
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

module.exports.register = async (req, res) => {
  try {
    const {
      password,
      firstName,
      lastName
    } = req.body;
    const {
      email
    } = req.body.email.toLowerCase();

    const candidate = await User.findOne({
      email
    });
    if (candidate) {
      return res.status(400).json({
        status: 'The email is already registered',
      });
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName
    });

    await newUser.save();

    res.status(200).json({
      status: 'User registered successfully'
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};
