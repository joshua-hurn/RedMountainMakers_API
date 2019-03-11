const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./index');
const signToken = user => {
  return jwt.sign({
    sub: user.id,
    iat: new Date().getTime()
  }, JWT_SECRET);
}
module.exports = signToken;