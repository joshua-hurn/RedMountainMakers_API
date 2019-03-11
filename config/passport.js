const LocalStrategy = require('passport-local').Strategy;
const ppJWT = require('passport-jwt');
const ExtractJWT = ppJWT.ExtractJwt;
const JWTStrategy = ppJWT.Strategy;
const { JWT_SECRET } = require('./index');
const bcrypt = require('bcryptjs');
// Load User model
const Users = require('../db/models').Users;
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    },
      async (email, password, done) => {
        try {
          const user = await Users.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user, { message: 'Logged in Successfully.' });
            } else {
              return done(null, false, { message: 'Password is incorrect.' });
            }
          });
        } catch (err) {
          done(err, false);
        }
      })
  );
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await Users.findById(jwt_payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(error, false);
    }
  }
  ));
};