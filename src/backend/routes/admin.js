const router = require('express').Router();

const upload = require('../middlewares/upload');
const {
  userValidator,
  tokenValidator,
  captchaValidator
} = require('../middlewares/requestValidators');
const {
  renderLogin,
  login,
  logout,
  renderMain,
  addToMain,
  updateMain,
  deleteFromMain,
  renderProduct,
  updateProduct,
  addImage
} = require('../controllers/admin');

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

router.get( '/login', renderLogin);

router.post( '/login', captchaValidator('login'), userValidator, login);

router.get( '/logout', tokenValidator, logout);

router.get( '/', tokenValidator, renderMain);

router.post( '/', tokenValidator, addToMain);

router.put( '/', tokenValidator, updateMain);

router.delete( '/', tokenValidator, deleteFromMain);

router.get( '/product/:id', tokenValidator, renderProduct);

router.put( '/product/:id', tokenValidator, updateProduct);

router.post( '/upload/image', tokenValidator, upload.single('image'), addImage);

module.exports = router;
