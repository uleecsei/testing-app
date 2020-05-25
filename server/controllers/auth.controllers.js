const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

require("dotenv").config();

module.exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
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

    const token = jwt.sign({
      userId: user.id
    }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      status: 'User authenticated successfully',
      token: `Bearer ${token}`,
    });
  } catch (e) {
    errorHandler(res, 500, e);
  }
};

// module.exports.googleLogin = async(req, res) => {
//   try {
//     const token = jwt.sign({
//       userId: req.user._id
//     }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({
//       status: 'User authenticated successfully',
//       token: `Bearer ${token}`,
//     });
//   } catch (e) {
//     errorHandler(res, 500, e);
//   }
// };

module.exports.googleLogin = (req, res) => {
  res.redirect('http://localhost:4200/home');
};

module.exports.register = async (req, res) => {
  try {
    const {email, password, firstName, lastName} = req.body;

    const candidate = await User.findOne({email});
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
