( () => {

  document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  runCaptcha();
  })

  const runCaptcha = () => {

    grecaptcha.execute('6LfQhsEUAAAAAHDEZLdAba-Vv-x0VAQxBRGIlk16', {
      action: 'homepage'
    }).then(function (token) {
      //campos no form
      const user = document.querySelector('#user');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');
      const captcha = token;

      sendData(user, email, message , captcha);
    });
}

  const sendData = ((user, email, message , captcha) => {
    const info = JSON.stringify({
      user: user,
      email: email,
      message: message,
      captcha: captcha
    });

    fetch('/verify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: info
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('msg:' + data.msg + ', score: ' + data.score)
    });
  });
})();