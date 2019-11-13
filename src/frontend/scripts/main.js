(() => {

  const trigger = document.getElementById('products');
  const header = document.querySelector('.header');
  const headerLogo = document.querySelector('.header .logo__content');

  zeitgeber.switchThemes(
    trigger,
    header,
    headerLogo,
    '/img/t4p-light.svg',
    '/img/t4p-dark.svg',
    'header--dark',
    65
  );

  const products = Array.from( document.querySelectorAll('.products .product') );

  // zeitgeber.setImagesWhenLoaded( products );

  const fadeInEffectNodes = [
    [ document.querySelectorAll('#cloud .ad__item'), 'cloud__fade-in' ],
    [ document.querySelectorAll('#zeitgeber .ad__item'), 'zeitgeber__fade-in' ]
  ];

  fadeInEffectNodes.forEach( e => zeitgeber.fadeIn( ...e ) );

  const contactForm = document.querySelector('.contact__form');

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
