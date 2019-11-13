(() => {

  const orderForm = document.getElementById('order_form');

  orderForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputs = zeitgeber.extractRequestPayload(orderForm, 'input', 'value');  
    const textareas = zeitgeber.extractRequestPayload(orderForm, 'textarea', 'value');  
    const productName = document.querySelector('.options__title').innerText;
    const options = orderForm.querySelectorAll('.bullets .bullets__item');
    const checkedOptions = Array.from(options).map(option => option.innerText);

    await zeitgeber.sendCaptchaRequest('order', '/order', {
      ...inputs,
      ...textareas,
      productName: productName,
      options: checkedOptions
    });

    window.location.href = window.location.pathname;
  });

})();
