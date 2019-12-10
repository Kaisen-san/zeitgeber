const router = require('express').Router();

const { captchaValidator } = require('../middlewares/requestValidators');
const {
  renderMain,
  renderProduct,
  emailContact,
  emailOrder
} = require('../controllers/user');

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

router.get( '/', renderMain);

router.get( '/product/:id', renderProduct);

router.post( '/contact', captchaValidator('contact'), emailContact);

router.post( '/order', captchaValidator('order'), emailOrder);

module.exports = router;
