const images = Array.from( document.querySelectorAll('.carrosel div img') );

images.forEach( ( img, idx, arr ) => img.addEventListener( 'click', ( evt ) => {
  arr.forEach( i => i.classList.remove( 'left', 'middle', 'right', 'hide' ) );

  let leftIdx = idx - 1;
  let rightIdx = idx + 1;

  if ( leftIdx === -1 ) {
    leftIdx = arr.length - 1;
  }

  if ( rightIdx === arr.length ) {
    rightIdx = 0;
  }

  img.classList.add('middle');
  arr[ leftIdx ].classList.add('left');
  arr[ rightIdx ].classList.add('right');
  arr.forEach( ( e, i ) => {
    if ( i !== idx && i !== leftIdx && i !== rightIdx ) {
      arr[ i ].classList.add('hide');
    }
  });
}));
