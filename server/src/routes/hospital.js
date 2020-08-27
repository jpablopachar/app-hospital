const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

const router = Router();

router.get('/', getHospitals);
router.post('/', [
  validJWT,
  check('name', 'El nombre del hospital es necesario').not().isEmpty(),
  validFields,
], createHospital);
router.put('/:id', [
  validJWT,
  check('name', 'El nombre del hospital es necesario').not().isEmpty(),
  validFields,
], updateHospital);
router.delete('/:id', validJWT, deleteHospital);

module.exports = router;
