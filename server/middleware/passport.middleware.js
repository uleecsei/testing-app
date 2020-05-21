const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
require("dotenv").config();

const optionsJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports.jwt = (passport) => {
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

const optionsGoogle = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8084/api/auth/google/callback"
};

module.exports.google = (passport) => {
  passport.use(
    new GoogleStrategy(
      optionsGoogle,
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({googleId: profile.id});

          if (user) {
            return done(null, user);
          }

          const candidate = await User.findOne({email: profile.email});

          if (candidate) {
            await candidate.update({googleId: profile.id});
            await candidate.save();
            return done(null, candidate);
          }

          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          });

          const savedUser = await newUser.save();
          return done(null, savedUser);
        } catch (e) {
          console.log(e);
        }
      }),
  );
};
