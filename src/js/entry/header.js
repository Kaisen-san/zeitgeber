let _isBelowTriggerZone = false;

(() => {

  const switchThemes = (
    trigger,
    header,
    headerLogo,
    lightLogo,
    darkLogo,
    themeClass
  ) => {
    window.addEventListener( 'scroll', evt => {
      const positionFromTop = trigger.getBoundingClientRect().top;

      // The code below switches the current theme only when the trigger zone
      // is passed, this way the theme changes are applied once every trigger
      if ( _isBelowTriggerZone ) {
        if ( positionFromTop >= 65 ) {
          header.classList.remove( themeClass );
          headerLogo.attributes.src.value = lightLogo;
          _isBelowTriggerZone = false;
        }
      } else {
        if ( positionFromTop < 65 ) {
          header.classList.add( themeClass );
          headerLogo.attributes.src.value = darkLogo;
          _isBelowTriggerZone = true;
        } 
      }
    });
  }

  const trigger = document.querySelector('.products');
  const header = document.querySelector('.header');
  const headerLogo = document.querySelector('.header .logo__content');

  switchThemes(
    trigger,
    header,
    headerLogo,
    '/img/t4p-light.svg',
    '/img/t4p-dark.svg',
    'header--dark'
  );

})();