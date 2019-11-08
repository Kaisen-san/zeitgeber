( () => {

  document.getElementById('purchase-form').addEventListener('submit', (e) => {
  e.preventDefault();
  runCaptcha();
  })

  const runCaptcha = () => {

    grecaptcha.execute('6LfQhsEUAAAAAHDEZLdAba-Vv-x0VAQxBRGIlk16', {
      action: 'homepage'
    }).then(function (token) {
      //campos no form
      const firstName = document.querySelector('#first-name');
      const lastName = document.querySelector('#last-name');
      const email = document.querySelector('#purchase-email');
      const address = document.querySelector('#address');
      const message = document.querySelector('#purchase-message');
      const captcha = token;

      sendData( firstName, lastName, email,  address, message , captcha );
    });
}

  const sendData = (( firstName, lastName, email,  address, message , captcha ) => {
    const info = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
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