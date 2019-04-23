const scrollEffect = ( elements, className ) => {
  window.addEventListener( 'scroll', evt => {
    elements.forEach( e => {
      let posTop = e.getBoundingClientRect().top;

      if ( posTop < 800 ) {
        e.classList.remove( className );
      }
    });
  });
};

const cloudElems = document.querySelectorAll('.cloud-item');
const zeitgeberElems = document.querySelectorAll('.zeitgeber-item');

scrollEffect(cloudElems, 'cloud-scroll-effect');
scrollEffect(zeitgeberElems, 'zeitgeber-scroll-effect');
