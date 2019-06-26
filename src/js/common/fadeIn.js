(() => {

  const fadeInEffect = ( elementsToApply, fadeInClass ) => {
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

  const fadeInEffectNodes = [
    [ document.querySelectorAll('#cloud .ad__item'), 'cloud__fade-in' ],
    [ document.querySelectorAll('#zeitgeber .ad__item'), 'zeitgeber__fade-in' ]
  ];

  fadeInEffectNodes.forEach( e => fadeInEffect( ...e ) );

})();