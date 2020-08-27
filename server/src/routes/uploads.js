const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validJWT } = require('../middlewares/valid-jwt');
const { fileUpload, returnImage } = require('../controllers/uploads');
const { use } = require('./hospital');

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id', validJWT, fileUpload);
router.get('/:type/:photo', returnImage);

module.exports = router;
