const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');

const sign = (payload) => {
  const signOptions = {
    expiresIn: '7d',
    algorithm: 'RS256'
  };

  return jwt.sign(payload, privateKEY, signOptions);
}

const verify = (token) => {
  const verifyOptions = {
    expiresIn: '7d',
    algorithm: ['RS256']
  };

  try {
    return jwt.verify(token, publicKEY, verifyOptions);
  } catch (err) {
    return false;
  }
}

const decode = (token) => {
  return jwt.decode(token, { complete: true }); // returns null if token is invalid
}

module.exports = {
  sign,
  verify,
  decode
}
