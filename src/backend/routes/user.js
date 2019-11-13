const router = require('express').Router();

const db = require('../configs/database');
const mail = require('../libs/mail');
const { captchaValidator } = require('../middlewares/requestValidators');

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

router.get( '/', async ( req, res, next ) => {
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

router.get( '/product/:id', async ( req, res, next ) => {
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

router.post( '/contact', captchaValidator('contact'), ( req, res, next ) => {
  const { name, email, message } = req.body;

  mail.sendMail({
    from: 'Zeitgeber <zeitgeber@t4p.com>',
    to: 'Vanderlei <vparro@t4p.com>',
    subject: `Contato - ${name}`,
    html: `
      <h4><strong>${name}</strong> (<a href='mailto:${email}'>${email}</a>) te enviou a seguinte mensagem:</h4>
      <pre>${message}</pre>
    `
  });

  res.status(200).json({});
});

router.post( '/order', captchaValidator('order'), ( req, res, next ) => {
  const { name, phone, email, address, message, productName, options } = req.body;

  mail.sendMail({
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

module.exports = router;
