const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

router.post('/', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validFields,
], login);
router.post('/google', [
  check('token', 'El token de Google es obligatorio').not().isEmpty(),
  validFields,
], googleSignIn);
router.get('/renew', validJWT, renewToken);

module.exports = router;
