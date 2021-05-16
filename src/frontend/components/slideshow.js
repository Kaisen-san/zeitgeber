(() => {

  const slideshowAnimation = ( imgs, btns, titles, idx ) => {
    imgs.forEach( e =>
      e.classList.remove(
        classNames.imgMiddle,
        classNames.imgLeft,
        classNames.imgRight,
        classNames.imgHide
      )
    );

    idx = ( idx === imgs.length ) ? 0 : idx;

    let leftIdx = ( idx - 1 === -1 ) ? imgs.length - 1 : idx - 1;
    let rightIdx = ( idx + 1 === imgs.length ) ? 0 : idx + 1;

    imgs[ idx ].classList.add( classNames.imgMiddle );
    imgs[ leftIdx ].classList.add( classNames.imgLeft );
    imgs[ rightIdx ].classList.add( classNames.imgRight );

    imgs.forEach( ( img, i ) => {
      if ( i !== idx && i !== leftIdx && i !== rightIdx ) {
        img.classList.add( classNames.imgHide );
      }
    });

    btns.forEach( btn => btn.classList.remove( classNames.btnActive ) );
    titles.forEach( title => title.classList.remove( classNames.titleActive ) );

    btns[ idx ].classList.add( classNames.btnActive );
    titles[ idx ].classList.add( classNames.titleActive );
  };

  const classNames = {
    img: 'slideshow__img',
    imgMiddle: 'slideshow__img--middle',
    imgLeft: 'slideshow__img--left',
    imgRight: 'slideshow__img--right',
    imgHide: 'slideshow__img--hide',
    btn: 'slideshow__btn',
    btnActive: 'slideshow__btn--active',
    title: 'slideshow__title',
    titleActive: 'slideshow__title--active'
  }

  const imagesList =
    Array.from( document.querySelectorAll( '.' + classNames.img ) );

  const buttonsList =
    Array.from( document.querySelectorAll( '.' + classNames.btn ) );

  const titlesList =
    Array.from( document.querySelectorAll( '.' + classNames.title ) );

  imagesList.forEach( ( img, idx ) => {
    img.addEventListener( 'click', evt => {
      const targetClasses = Array.from( evt.target.classList );
      const i = targetClasses.includes( classNames.imgMiddle ) ? idx + 1 : idx;

      slideshowAnimation( imagesList, buttonsList, titlesList, i );
    });
  });

  buttonsList.forEach( ( btn, idx ) => {
    btn.addEventListener( 'click', evt => {
      slideshowAnimation( imagesList, buttonsList, titlesList, idx );
    });
  });

})();
