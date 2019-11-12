const jwt = require('../helpers/jwt');

const _generateTokenCookie = (signPayload) => {
  return {
    name: 'tokenKey',
    value: jwt.sign(signPayload),
    options: {
      'maxAge': 2592000000 // 30 days timestamp
    }
  }
}

const _parseCookie = (cookie) => {
  if (cookie == null) {
    return {};
  }

  return cookie.split(' ').reduce((acc, cur) => {
    const keyValue = cur.split('=');

    return {
      ...acc,
      [keyValue[0]]: keyValue[1]
    }
  }, {});
}

const _isTokenAboutToExpire = (token) => {
  const { payload } = jwt.decode(token);
  
  // Renew cookie's token if it's going to expire in 2 days
  return new Date(payload.exp * 1000) - Date.now() < 172800000;
}

const validateUser = (req, res, next) => {
  const { tokenKey: token } = _parseCookie(req.headers.cookie);

  if (token) {
    if (jwt.verify(token)) {
      if (_isTokenAboutToExpire(token)) {
        const cookie = _generateTokenCookie({ admin: true });

        res.cookie(cookie.name, cookie.value, cookie.options);
      }

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
  const { tokenKey: token } = _parseCookie(req.headers.cookie);

  if (!token) {
    return res.status(401).redirect('/admin/login');
  }

  if (!jwt.verify(token)) {
    return res.status(401).redirect('/admin/login');
  }

  if (_isTokenAboutToExpire(token)) {
    const cookie = _generateTokenCookie({ admin: true });

    res.cookie(cookie.name, cookie.value, cookie.options);
  }

  next();
}

module.exports = {
  validateUser,
  validateToken
}
