(() => {

  zeitgeber.isBelowTriggerZone = false;

  zeitgeber.switchThemes = (
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
      if ( zeitgeber.isBelowTriggerZone ) {
        if ( positionFromTop >= 65 ) {
          header.classList.remove( themeClass );
          headerLogo.attributes.src.value = lightLogo;
          zeitgeber.isBelowTriggerZone = false;
        }
      } else {
        if ( positionFromTop < 65 ) {
          header.classList.add( themeClass );
          headerLogo.attributes.src.value = darkLogo;
          zeitgeber.isBelowTriggerZone = true;
        } 
      }
    });
  }

})();
