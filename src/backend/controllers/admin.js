const path = require('path');

const db = require('../configs/database');
const resizeAndSaveImage = require('../libs/image');
const { excludeEquals } = require('../helpers/array');

const renderLogin = ( req, res, next ) => {
  res.status(200).render('login');
}

const login = ( req, res, next ) => {
  res.status(200).json({ redirectTo: '/admin' });
}

const logout = ( req, res, next ) => {
  res.clearCookie('tokenKey');
  res.status(200).redirect('/admin/login');
}

const renderMain = async ( req, res, next ) => {
  try {
    const hero = db.select({
      id: 'hero.hero_id',
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
      id: 'feature.feature_id',
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
}

const addToMain = async ( req, res, next ) => {
  console.log('POST', req.body);
  const { to } = req.query;
  let result = {};

  try {
    if (to === 'product') {
      await db.insert({ name: '', category: '' }).into('product');
      const { product_id } = await db.select('product_id').from('product').orderBy('product_id', 'desc').first();
      result.id = product_id;

      await db.insert({
        product_id: result.id,
        brief: '',
        image_id: 1
      }).into('product_card');
      await db.insert({
        product_id: result.id,
        short_description: '',
        long_description: '',
        bullets: '',
        characteristics: ''
      }).into('product_info');
    }
    else if (to === 'projectInfo') {
      const { projectInfo: { content, image } } = req.body;
      const image_url = '/img/' + image.substr(image.lastIndexOf('/') + 1);
      const { image_id } = await db.select({ image_id: 'image_id' }).from('image').where({ image_url }).first();

      await db.insert({ content, image_id }).into('project_info');
      const { info_id } = await db.select('info_id').from('project_info').orderBy('info_id', 'desc').first();
      result.id = info_id;
    }

    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error});
  }
}

const updateMain = async ( req, res, next ) => {
  console.log('PUT', req.body);
  const { to } = req.query;

  try {
    if (to === 'hero') {
      const { hero: { message, image } } = req.body;
      const imageUrl = '/img/' + image.substr(image.lastIndexOf('/') + 1);
      const { image_id } = await db.select({ image_id: 'image_id' }).from('image').where({ 'image_url': imageUrl }).first();

      await db('hero').where({ 'hero_id': 1 }).update({ image_id: image_id, message: message });
    }
    else if (to === 'cloud') {
      const { cloud: { title, content, image } } = req.body;
      const imageUrl = '/img/' + image.substr(image.lastIndexOf('/') + 1);
      const { image_id } = await db.select({ image_id: 'image_id' }).from('image').where({ 'image_url': imageUrl }).first();

      await db('feature').where({ 'feature_id': 1 }).update({ title: title, content: content, image_id: image_id });
    }
    else if (to === 'projectInfo') {
      const { projectInfo: { id, content, image } } = req.body;
      const imageUrl = '/img/' + image.substr(image.lastIndexOf('/') + 1);
      const { image_id } = await db.select({ image_id: 'image_id' }).from('image').where({ 'image_url': imageUrl }).first();

      await db('project_info').where({ 'info_id': id }).update({ content: content, image_id: image_id });
    }
    else {
      return res.status(400).json({ ok: false, message: 'Invalid request.' });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error});
  }
}

const deleteFromMain = async ( req, res, next ) => {
  console.log('DELETE', req.query);
  const fields = {
    'product': {
      table: 'product',
      idField: 'product_id'
    },
    'projectInfo': {
      table: 'project_info',
      idField: 'info_id'
    }
  }
  const { from, id } = req.query;

  try {
    await db(fields[from].table).where({ [fields[from].idField]: id }).delete();

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error});
  }
}

const renderProduct = async ( req, res, next ) => {
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
      characteristics: 'product_info.characteristics'
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
      id: 'option.option_id',
      text: 'option.option',
      subtext: 'option.subtext'
    })
    .from('product_options')
    .leftJoin('option', 'option.option_id', 'product_options.option_id')
    .where('product_options.product_id', id);
  
    const options = db.select({
      id: 'option.option_id',
      text: 'option.option',
      subtext: 'option.subtext'
    })
    .from('option');

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
      options: await options,
      images: await images
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
}

const updateProduct = async ( req, res, next ) => {
  console.log('PUT', req.body, req.params);
  const { id } = req.params;
  const { to } = req.query;

  try {
    if (to === 'product') {
      const { product: { name, category } } = req.body;

      await db('product').where({ 'product_id': id }).update({ name, category });
    }
    else if (to === 'productCard') {
      const { card: { brief, image } } = req.body;
      const image_url = '/img/' + image.substr(image.lastIndexOf('/') + 1);
      const { image_id } = await db.select({ image_id: 'image_id' }).from('image').where({ image_url }).first();

      await db('product_card').where({ 'product_id': id }).update({ image_id, brief });
    }
    else if (to === 'purchase') {
      const { purchase: { short_description, options, images } } = req.body;
      const imagesUrl = images.map( image => '/img/' + image.substr(image.lastIndexOf('/') + 1) );
      const newImagesId = await db.select({ image_id: 'image_id' }).from('image').whereIn('image_url', imagesUrl);
      const oldImagesId = await db.select({ image_id: 'image_id' }).from('product_images').where({ 'product_id': id });
      const oldOptionsId = await db.select({ option_id: 'option_id' }).from('product_options').where({ 'product_id': id });

      console.log('aqui 0');
      excludeEquals(oldOptionsId, options, 'option_id');
      excludeEquals(oldImagesId, newImagesId, 'image_id');

      oldImagesId.forEach(async ({ image_id }) => {
        await db('product_images').where({ 'product_id': id, 'image_id': image_id }).delete();
      });

      console.log('aqui 1');
      
      newImagesId.forEach(async ({ image_id }) => {
        await db.insert({ 'product_id': id, 'image_id': image_id }).into('product_images');
      });

      console.log('aqui 2');
      oldOptionsId.forEach(async ({ option_id }) => {
        await db('product_options').where({ 'product_id': id, 'option_id': option_id }).delete();
      });

      console.log('aqui 3');
      options.forEach(async ({ option_id }) => {
        await db.insert({ 'product_id': id, 'option_id': option_id }).into('product_options');
      });

      console.log('aqui 4');
      await db('product_info').where({ 'product_id': id }).update({ short_description });
    }
    else if (to === 'productInfo') {
      const { productInfo: { long_description, bullets, characteristics } } = req.body;

      await db('product_info').where({ 'product_id': id }).update({ long_description, bullets, characteristics });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error});
  }
}

const saveImage = async ( req, res, next ) => {
  if ( !req.file ) {
    return res.status(401).json({ error: 'Please provide an image' });
  }

  try {
    const imagePath = path.join( __dirname, '/../../../public/img' );
    const filename = await resizeAndSaveImage( imagePath, req.file.buffer );

    res.status(201).json({ name: filename });
  } catch (error) {
    res.status(500).json({ ok: false, error: error});
  }
}

module.exports = {
  renderLogin,
  login,
  logout,
  renderMain,
  addToMain,
  updateMain,
  deleteFromMain,
  renderProduct,
  updateProduct,
  saveImage
}
