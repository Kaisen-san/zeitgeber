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
  try {
    const hero = db.select({
      message: 'hero.message',
      image: 'image.image_url'
    })
    .from('hero')
    .leftJoin('image', 'image.image_id', 'hero.image_id')
    .first();

    const products = db.select({
      id: 'product.product_id',
      name: 'product.name',
      category: 'product.category',
      brief: 'product_card.brief',
      image: 'image.image_url'
    })
    .from('product')
    .leftJoin('product_card', 'product_card.product_id', 'product.product_id')
    .leftJoin('image', 'image.image_id', 'product_card.image_id');

    const cloud = db.select({
      title: 'feature.title',
      content: 'feature.content',
      buttonText: 'feature.button',
      image: 'image.image_url'
    })
    .from('feature')
    .leftJoin('image', 'image.image_id', 'feature.image_id')
    .first();

    const projectInfo = db.select({
      content: 'project_info.content',
      image: 'image.image_url'
    })
    .from('project_info')
    .leftJoin('image', 'image.image_id', 'project_info.image_id');

    res.status(200).render('main', {
      hero: await hero,
      products: await products,
      cloud: await cloud,
      projectInfo: await projectInfo
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get( '/product/:id', async ( req, res, next ) => {
  const { id } = req.params;

  try {
    const product = db.select({
      name: 'product.name',
      category: 'product.category',
    })
    .from('product')
    .where('product.product_id', id)
    .first();

    const productInfo = db.select({
      shortDescription: 'product_info.short_description',
      longDescription: 'product_info.long_description',
      bullets: 'product_info.bullets',
      table: 'product_info.characteristics_table'
    })
    .from('product_info')
    .where('product_info.product_id', id)
    .first();

    const productImages = db.select({
      image: 'image.image_url'
    })
    .from('product_images')
    .leftJoin('image', 'image.image_id', 'product_images.image_id')
    .where('product_images.product_id', id);

    const productOptions = db.select({
      text: 'option.option',
      subtext: 'option.subtext'
    })
    .from('product_options')
    .leftJoin('option', 'option.option_id', 'product_options.option_id')
    .where('product_options.product_id', id);

    res.status(200).render('product', {
      product: await product,
      productInfo: await productInfo,
      productImages: await productImages,
      productOptions: await productOptions
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
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

  res.status(200).json({});
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

app.get( '/admin', request.validateToken, async ( req, res, next ) => {
  try {
    const hero = db.select({
      message: 'hero.message',
      image: 'image.image_url'
    })
    .from('hero')
    .leftJoin('image', 'image.image_id', 'hero.image_id')
    .first();

    const products = db.select({
      id: 'product.product_id',
      name: 'product.name',
      category: 'product.category',
      image: 'image.image_url'
    })
    .from('product')
    .leftJoin('product_card', 'product_card.product_id', 'product.product_id')
    .leftJoin('image', 'image.image_id', 'product_card.image_id');

    const cloud = db.select({
      title: 'feature.title',
      content: 'feature.content',
      image: 'image.image_url'
    })
    .from('feature')
    .leftJoin('image', 'image.image_id', 'feature.image_id')
    .first();

    const projectInfo = db.select({
      id: 'project_info.info_id',
      content: 'project_info.content',
      image: 'image.image_url'
    })
    .from('project_info')
    .leftJoin('image', 'image.image_id', 'project_info.image_id');

    const images = db.select({
      id: 'image.image_id',
      image: 'image.image_url'
    })
    .from('image');

    res.status(200).render('admin', {
      hero: await hero,
      cloud: await cloud,
      products: await products,
      projectInfo: await projectInfo,
      images: await images
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post( '/admin', request.validateToken, ( req, res, next ) => {
  console.log('POST', req.body);
  res.status(200).json({ ok: true, data: { id: 3 } });
});

app.put( '/admin', request.validateToken, ( req, res, next ) => {
  console.log('PUT', req.body);
  res.status(200).json({ ok: true });
});

app.get( '/admin/product/:id', request.validateToken, async ( req, res, next ) => {
  const { id } = req.params;

  try {
    const product = db.select({
      name: 'product.name',
      category: 'product.category',
    })
    .from('product')
    .where('product.product_id', id)
    .first();

    const productCard = db.select({
      brief: 'product_card.brief',
      image: 'image.image_url'
    })
    .from('product_card')
    .leftJoin('image', 'image.image_id', 'product_card.image_id')
    .where('product_card.product_id', id)
    .first();

    const productInfo = db.select({
      shortDescription: 'product_info.short_description',
      longDescription: 'product_info.long_description',
      bullets: 'product_info.bullets',
      table: 'product_info.characteristics_table'
    })
    .from('product_info')
    .where('product_info.product_id', id)
    .first();

    const productImages = db.select({
      image: 'image.image_url'
    })
    .from('product_images')
    .leftJoin('image', 'image.image_id', 'product_images.image_id')
    .where('product_images.product_id', id);

    const productOptions = db.select({
      text: 'option.option',
      subtext: 'option.subtext'
    })
    .from('product_options')
    .leftJoin('option', 'option.option_id', 'product_options.option_id')
    .where('product_options.product_id', id);

    const images = db.select({
      id: 'image.image_id',
      image: 'image.image_url'
    })
    .from('image');

    res.status(200).render('admin-product', {
      product: await product,
      productCard: await productCard,
      productInfo: await productInfo,
      productImages: await productImages,
      productOptions: await productOptions,
      images: await images
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }

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
