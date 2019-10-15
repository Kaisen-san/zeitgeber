(() => {

  zeitgeber.applyFadeIn = ( elementsToApply, fadeInClass ) => {
    elementsToApply.forEach( e => e.classList.add( fadeInClass ) );

    window.addEventListener( 'scroll', evt => {
      elementsToApply.forEach( e => {
        const positionFromTop = e.getBoundingClientRect().top;

        if ( positionFromTop < 800 ) {
          e.classList.remove( fadeInClass );
        }
      });
    });
  };

})();
