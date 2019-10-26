const express = require('express');
const path = require('path');

const upload = require('./src/middlewares/upload');
const Resize = require('./src/scripts/resize');

const app = express();
const port = process.env.PORT || 3000;

app.set( 'views', path.join( __dirname, 'src/views' ) );
app.set( 'view engine', 'ejs' );

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/', ( req, res, next ) => {
  res.render('main');
});

app.get( '/product/:id', ( req, res, next ) => {
  const { id } = req.params;
  res.render('product');
});

app.post( '/contact', ( req, res, next ) => {
  res.redirect('/');
});

app.get( '/admin', ( req, res, next ) => {
  res.render('admin');
});

app.post( '/admin', ( req, res, next ) => {
  console.log(req.body);
  res.end();
});

app.get( '/admin/main', ( req, res, next ) => {
  res.render('admin-main');
});

app.post( '/admin/main', ( req, res, next ) => {
  console.log(req.body);
  res.end();
});

app.get( '/admin/product/:id', ( req, res, next ) => {
  const { id } = req.params;
  res.render('admin-product');
});

app.post( '/admin/product/:id', ( req, res, next ) => {
  console.log(req.body, req.params);
  const { id } = req.params;
  res.end();
});

app.post( '/admin/upload/image', upload.single('image'), async ( req, res, next ) => {
  const imagePath = path.join( __dirname, '/public/img' );
  const fileUpload = new Resize( imagePath );

  if ( !req.file ) {
    return res.status(401).json({ error: 'Please provide an image' });
  }

  const filename = await fileUpload.save( req.file.buffer );
  return res.status(200).json({ name: filename });
});

app.listen( port, ( err ) => {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `App listening at port: ${port}` );
  }
});
