const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set( 'views', path.join( __dirname, 'src/views' ) );
app.set( 'view engine', 'ejs' );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/', ( req, res, next ) => {
  res.render('main');
});

app.get( '/product/:id', ( req, res, next ) => {
  const productId = req.params.id;
  res.render('product');
});

app.post( '/contact', ( req, res, next ) => {
  res.redirect('/');
});

app.listen( port, ( err ) => {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `App listening at port: ${port}` );
  }
});
