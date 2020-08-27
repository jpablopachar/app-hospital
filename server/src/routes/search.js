const { Router } = require('express');

const { getAll, getDocumentsCollection } = require('../controllers/searchs');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

router.get('/:search', validJWT, getAll);
router.get('/collection/:table/:search', validJWT, getDocumentsCollection);

module.exports = router;
