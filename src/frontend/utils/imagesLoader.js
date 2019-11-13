(() => {

  zeitgeber.setImagesWhenLoaded = ( elements ) => {
    const imgPromises = elements.map( e => fetch( e.getAttribute('imgUrl') ) );

    Promise.all( imgPromises ).then( imgs => {
      elements.forEach(( e, i ) => {
        e.style.backgroundImage = `url(${imgs[i].url})`;
      })
    });
  };

})();
