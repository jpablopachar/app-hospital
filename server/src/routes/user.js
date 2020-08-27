const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const router = Router();

router.get('/', validJWT, getUsers);
router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  validFields,
], createUser);
router.put('/:id', [
  validJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('role', 'El rol es obligatorio').not().isEmpty(),
  validFields,
], updateUser);
router.delete('/:id', validJWT, deleteUser);

module.exports = router;
