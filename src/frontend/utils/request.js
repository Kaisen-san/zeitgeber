(() => {

  zeitgeber.extractRequestPayload = ($fromTarget, byQuery, withField) => {
    const $elements = $fromTarget.querySelectorAll(byQuery);
    return Array.from($elements).reduce((acc, $cur) => {
      return {
        ...acc,
        [$cur.name]: $cur[withField]
      };
    }, {});
  }

  zeitgeber.sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: (data instanceof FormData) ? data : JSON.stringify(data),
      headers: (data instanceof FormData) ? {} : { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.status >= 400) {
        return response.json().then(errResData => {
          const error = new Error('Something went wrong requesting your data');
          error.data = errResData;
          throw error;
        });
      }

      return response.json();
    });
  }

  zeitgeber.sendCaptchaRequest = async (captchaAction, url, data) => {
    const token = await grecaptcha.execute('6LfQhsEUAAAAAHDEZLdAba-Vv-x0VAQxBRGIlk16', {
      action: captchaAction
    });

    return await zeitgeber.sendHttpRequest('POST', url, {
      ...data,
      captcha: token
    });
  }

})();
