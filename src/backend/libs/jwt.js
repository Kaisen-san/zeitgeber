const jwt = require('jsonwebtoken');

const privateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64');
const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64');

const sign = (payload) => {
  const signOptions = {
    expiresIn: '7d',
    algorithm: 'RS256'
  };

  return jwt.sign(payload, privateKey, signOptions);
}

const verify = (token) => {
  const verifyOptions = {
    expiresIn: '7d',
    algorithm: ['RS256']
  };

  try {
    return jwt.verify(token, publicKey, verifyOptions);
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
