require('dotenv/config');
const express = require('express');
const path = require('path');

const db = require('./src/settings/database');
const request = require('./src/middlewares/request');
const upload = require('./src/middlewares/upload');
const resizeAndSaveImage = require('./src/helpers/image');
const Mail = require('./src/helpers/Mail');

const app = express();
const port = process.env.PORT || 4000;

app.set( 'views', path.join( __dirname, 'src/views' ) );
app.set( 'view engine', 'ejs' );

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

app.get( '/', async ( req, res, next ) => {
  const test = await db.select({
    name: '.product.name',
    category: 'product.category'
  })
  .from('product');

  console.log(test)

  res.status(200).render('main');
});

app.get( '/product/:id', ( req, res, next ) => {
  const { id } = req.params;
  res.status(200).render('product');
});

app.post( '/contact', ( req, res, next ) => {
  const { name, email, message } = req.body;

  Mail.sendMail({
    from: 'Zeitgeber <zeitgeber@t4p.com>',
    to: 'Vanderlei <vparro@t4p.com>',
    subject: `Contato - ${name}`,
    html: `
      <h4><strong>${name}</strong> (<a href='mailto:${email}'>${email}</a>) te enviou a seguinte mensagem:</h4>
      <pre>${message}</pre>
    `
  });

  res.status(200).redirect('/');
});

app.post( '/order', ( req, res, next ) => {
  const { name, phone, email, address, message, productName, options } = req.body;

  Mail.sendMail({
    from: 'Zeitgeber <zeitgeber@t4p.com>',
    to: 'Vanderlei <vparro@t4p.com>',
    subject: `Pedido - ${name}`,
    html: `
      <h4><strong>${name}</strong> (<a href='mailto:${email}'>${email}</a>) realizou o seguinte pedido:</h4>
      <h4><strong>Produto: ${productName}</strong></h4>
      <ul>
        ${options.map(option => `<li>${option}</li>`).toString().replace(/,/g, '')}
      </ul>
      <h4>E mandou a seguinte mensagem:</h4>
      <pre>${message}</pre>
      <h4>Dados Informados:</h4>
      <p>Nome: ${name}</p>
      <p>Telefone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Endereço: ${address}</p>
    `
  });

  res.status(200).redirect('/');
});

app.get( '/admin/login', ( req, res, next ) => {
  res.status(200).render('login');
});

app.post( '/admin/login', request.validateUser, ( req, res, next ) => {
  res.status(200).redirect('/admin');
});

app.get( '/admin/logout', request.validateToken, ( req, res, next ) => {
  res.clearCookie('tokenKey');
  res.status(200).redirect('/admin/login');
});

app.get( '/admin', request.validateToken, ( req, res, next ) => {
  res.status(200).render('admin', {
    hero: {
      message: 'Something',
      imgSrc: '/img/hero.jpg' 
    },
    cloud: {
      title: 'Something',
      content: 'Something else',
      imgSrc: '/img/hero.jpg'
    },
    products: [
      { id: 1, name: 'Name 1', imgSrc: '/img/hero.jpg' },
      { id: 2, name: 'Name 2', imgSrc: '/img/hero.jpg' },
      { id: 3, name: 'Name 3', imgSrc: '/img/hero.jpg' },
      { id: 4, name: 'Name 4', imgSrc: '/img/hero.jpg' }
    ],
    projectInfos: [
      { id: 1, message: 'Something', imgSrc: '/img/hero.jpg' },
      { id: 2, message: 'Something', imgSrc: '/img/hero.jpg' }
    ],
    images: [
      { imgSrc: '/img/ss-01.jpg' },
      { imgSrc: '/img/ss-02.jpg' },
      { imgSrc: '/img/ss-03.jpg' },
      { imgSrc: '/img/ss-04.jpg' },
      { imgSrc: '/img/ss-05.jpg' },
      { imgSrc: '/img/hero.jpg' }
    ]
  });
});

app.post( '/admin', request.validateToken, ( req, res, next ) => {
  console.log('POST', req.body);
  res.status(200).json({ ok: true, data: { id: 3 } });
});

app.put( '/admin', request.validateToken, ( req, res, next ) => {
  console.log('PUT', req.body);
  res.status(200).json({ ok: true });
});

app.get( '/admin/product/:id', request.validateToken, ( req, res, next ) => {
  const { id } = req.params;

  res.render('admin-product', {
    product: {
      name: 'Name',
      category: 'CAT'
    },
    card: {
      brief: 'Something',
      imgSrc: '/img/hero.jpg'
    },
    purchase: {
      description: 'Something',
      images: [
        { imgSrc: '/img/ss-01.jpg' },
        { imgSrc: '/img/ss-02.jpg' },
        { imgSrc: '/img/ss-03.jpg' },
        { imgSrc: '/img/ss-04.jpg' },
        { imgSrc: '/img/ss-05.jpg' }
      ]
    },
    productInfo: {
      content: 'Something else'
    },
    images: [
      { imgSrc: '/img/ss-01.jpg' },
      { imgSrc: '/img/ss-02.jpg' },
      { imgSrc: '/img/ss-03.jpg' },
      { imgSrc: '/img/ss-04.jpg' },
      { imgSrc: '/img/ss-05.jpg' },
      { imgSrc: '/img/hero.jpg' }
    ]
  });
});

app.put( '/admin/product/:id', request.validateToken, ( req, res, next ) => {
  const { id } = req.params;

  console.log('PUT', req.body, req.params);
  res.status(200).json({ ok: true });
});

app.post( '/admin/upload/image', request.validateToken, upload.single('image'), async ( req, res, next ) => {
  if ( !req.file ) {
    return res.status(401).json({ error: 'Please provide an image' });
  }

  const imagePath = path.join( __dirname, '/public/img' );
  const filename = await resizeAndSaveImage( imagePath, req.file.buffer );

  return res.status(200).json({ name: filename });
});

app.listen( port, ( err ) => {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `App listening at port: ${port}` );
  }
});
