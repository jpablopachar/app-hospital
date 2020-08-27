const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor');

const router = Router();

router.get('/', getDoctors);
router.post('/', [
  validJWT,
  check('name', 'El nombre del médico es necesario').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser válido').isMongoId(),
  validFields,
], createDoctor);
router.put('/:id', [
  validJWT,
  check('name', 'El nombre del médico es necesario').not().isEmpty(),
  check('hospital', 'El id del hospital debe ser válido').isMongoId(),
  validFields,
], updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
