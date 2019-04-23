const carousel = ( imgArr, btnArr, idx ) => {
  imgArr.forEach( e => e.classList.remove( 'carousel-left', 'carousel-middle', 'carousel-right', 'carousel-hide' ) );

  let leftIdx = ( idx - 1 === -1 ) ? imgArr.length - 1 : idx - 1;
  let rightIdx = ( idx + 1 === imgArr.length ) ? 0 : idx + 1;

  imgArr[ idx ].classList.add('carousel-middle');
  imgArr[ leftIdx ].classList.add('carousel-left');
  imgArr[ rightIdx ].classList.add('carousel-right');

  imgArr.forEach( ( img, i ) => {
    if ( i !== idx && i !== leftIdx && i !== rightIdx ) {
      img.classList.add('carousel-hide');
    }
  });

  btnArr.forEach( btn => btn.classList.remove('carousel-button-active') );

  btnArr[ idx ].classList.add('carousel-button-active');
}

const imagesArr = Array.from( document.querySelectorAll('.carousel-image') );
const buttonsArr = Array.from( document.querySelectorAll('.carousel-button') );

imagesArr.forEach( ( img, idx ) => {
  img.addEventListener( 'click', evt => {
    carousel( imagesArr, buttonsArr, idx );
  });
});

buttonsArr.forEach( ( btn, idx ) => {
  btn.addEventListener( 'click', evt => {
    carousel( imagesArr, buttonsArr, idx );
  });
});


const addScrollEffect = ( elements, className ) => {
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

addScrollEffect(cloudElems, 'cloud-scroll-effect');
addScrollEffect(zeitgeberElems, 'zeitgeber-scroll-effect');
