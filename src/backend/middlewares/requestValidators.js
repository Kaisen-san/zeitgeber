const request = require('request');
const jwt = require('../libs/jwt');

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

const userValidator = (req, res, next) => {
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

  if ( username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS ) {
    // TODO: Informar que o login não foi feito com sucesso
    return res.status(401).redirect('/admin/login');
  }

  const cookie = _generateTokenCookie({ admin: true });
  res.cookie(cookie.name, cookie.value, cookie.options);

  next();
}

const tokenValidator = (req, res, next) => {
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

const captchaValidator = captchaAction => (req, res, next) => {
  if(!req.body.captcha) {
    res.status(400).json( { message: 'reCAPTCHA token is undefined' } )
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GRC_PRIVATE}&response=${req.body.captcha}`;

  request(verifyUrl, (err, response, body) => {
    if (err) {
      console.error(err);
    }

    body = JSON.parse(body);

    if (!body.success || body.action !== captchaAction || body.score < 0.4) {
      return res.status(403).json({ message: 'Sorry, you might be a robot.' });
    }

    next();
  });
}

module.exports = {
  userValidator,
  tokenValidator,
  captchaValidator
}
