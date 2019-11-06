const jwt = require('../helpers/jwt');

const _generateTokenCookie = (signPayload) => {
  return {
    name: 'tokenKey',
    value: jwt.sign(signPayload),
    options: {
      'maxAge': 604800000
    }
  }
}

const _parseCookie = (cookie) => {
  return cookie.split(' ').reduce((acc, cur) => {
    const keyValue = cur.split('=');

    return {
      ...acc,
      [keyValue[0]]: keyValue[1]
    }
  });
}

const _renewTokenCookie = (token) => {
  // Renew cookie's token if it's going to expire in less than 2 days
  if (new Date(token.exp * 1000) - Date.now() < 172800000) {
    const cookie = _generateTokenCookie({ admin: true });

    res.cookie(cookie.name, cookie.value, cookie.options);
  }
}

const validateUser = (req, res, next) => {
  const token = _parseCookie(req.headers.cookie).tokenKey;

  if (token) {
    const legit = jwt.verify(token);

    if (legit) {
      _renewTokenCookie(legit);

      return next();
    }
  }

  const { username, password } = req.body;

  if ( username !== 'admin' || password !== '123456' ) {
    // TODO: Informar que o login não foi feito com sucesso
    return res.status(401).redirect('/admin/login');
  }

  const cookie = _generateTokenCookie({ admin: true });

  res.cookie(cookie.name, cookie.value, cookie.options);

  next();
}

const validateToken = (req, res, next) => {
  const token = _parseCookie(req.headers.cookie).tokenKey;

  if (!token) {
    return res.status(401).redirect('/admin/login');
  }

  const legit = jwt.verify(token);

  if (!legit) {
    return res.status(401).redirect('/admin/login');
  }

  _renewTokenCookie(legit);

  next();
}

module.exports = {
  validateUser,
  validateToken
}
