const setImagesWhenLoaded = ( products ) => {
  const imgPromises = products.map( p => fetch( p.getAttribute('imgUrl') ) );

  Promise.all( imgPromises ).then( imgs => {
    products.forEach( ( p, i ) => {
      p.style.backgroundImage = `url(${imgs[i].url})`;
    })
  });
};

const products = Array.from( document.querySelectorAll('.products .product') );

// setImagesWhenLoaded( products );