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

  fadeInEffectNodes.forEach( e => zeitgeber.applyFadeIn( ...e ) );

})();
