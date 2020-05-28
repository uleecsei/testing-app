const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
require("dotenv").config();

const optionsJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(optionsJWT, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    }),
  );
};
