const router = require('express').Router();

const db = require('../configs/database');
const resizeAndSaveImage = require('../libs/image');
const upload = require('../middlewares/upload');
const {
  userValidator,
  tokenValidator,
  captchaValidator
} = require('../middlewares/requestValidators');

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

router.get( '/login', ( req, res, next ) => {
  res.status(200).render('login');
});

router.post( '/login', captchaValidator('login'), userValidator, ( req, res, next ) => {
  res.status(200).json({ redirectTo: '/admin' });
});

router.get( '/logout', tokenValidator, ( req, res, next ) => {
  res.clearCookie('tokenKey');
  res.status(200).redirect('/admin/login');
});

router.get( '/', tokenValidator, async ( req, res, next ) => {
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

router.post( '/', tokenValidator, ( req, res, next ) => {
  console.log('POST', req.body);
  res.status(200).json({ ok: true, data: { id: 3 } });
});

router.put( '/', tokenValidator, ( req, res, next ) => {
  console.log('PUT', req.body);
  res.status(200).json({ ok: true });
});

router.get( '/product/:id', tokenValidator, async ( req, res, next ) => {
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
});

router.put( '/product/:id', tokenValidator, ( req, res, next ) => {
  const { id } = req.params;

  console.log('PUT', req.body, req.params);
  res.status(200).json({ ok: true });
});

router.post( '/upload/image', tokenValidator, upload.single('image'), async ( req, res, next ) => {
  if ( !req.file ) {
    return res.status(401).json({ error: 'Please provide an image' });
  }

  const imagePath = path.join( __dirname, '/public/img' );
  const filename = await resizeAndSaveImage( imagePath, req.file.buffer );

  return res.status(200).json({ name: filename });
});

module.exports = router;
