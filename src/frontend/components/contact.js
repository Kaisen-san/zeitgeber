(() => {

  const contactForm = document.querySelector('.contact__form');

  if (contactForm == null) {
    return;
  }

  contactForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputs = zeitgeber.extractRequestPayload(contactForm, 'input', 'value');
    const textareas = zeitgeber.extractRequestPayload(contactForm, 'textarea', 'value');

    await zeitgeber.sendCaptchaRequest('contact', '/contact', {
      ...inputs,
      ...textareas
    });

    window.location.href = window.location.pathname;
  });

})();
