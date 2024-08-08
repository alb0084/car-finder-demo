const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Strategy Configuration  auth locale
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log(`Attempting to authenticate user: ${username}`);
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log(`User not found: ${username}`);
        return done(null, false, { message: 'Username not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log(`Incorrect password for user: ${username}`);
        return done(null, false, { message: 'Incorrect password' });
      }

      console.log(`User authenticated successfully: ${username}`);
      return done(null, user);
    } catch (error) {
      console.log(`Error during authentication: ${error}`);
      return done(error);
    }
  }
));

// Conf Strategy Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        username: profile.emails[0].value,
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    console.error('Deserialization error :', error);
    done(error);
  }
});

module.exports = {
  passport,
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
  },
};
