const fadeInEffect = ( elementsToApply, fadeInClass ) => {
  window.addEventListener( 'scroll', evt => {
    elementsToApply.forEach( e => {
      let posTop = e.getBoundingClientRect().top;

      if ( posTop < 800 ) {
        e.classList.remove( fadeInClass );
      }
    });
  });
};

const addFadeInEffect = [
  [ document.querySelectorAll('.cloud-item'), 'cloud-scroll-effect' ],
  [ document.querySelectorAll('.zeitgeber-item'), 'zeitgeber-scroll-effect' ]
];

addFadeInEffect.forEach( e => fadeInEffect( ...e ) );