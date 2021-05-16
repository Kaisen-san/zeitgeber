require('dotenv/config');
const express = require('express');
const path = require('path');

const userRouter = require('./src/backend/routes/user');
const adminRouter = require('./src/backend/routes/admin');

const app = express();
const port = process.env.PORT || 4000;

app.set( 'views', path.join( __dirname, 'src/frontend/views' ) );
app.set( 'view engine', 'ejs' );

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen( port, ( err ) => {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `App listening at port: ${port}` );
  }
});
