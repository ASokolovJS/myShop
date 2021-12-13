const {Router} = require('express');
const router = Router()
const {getDetalis} = require('../controllers/details-controller');


router.get('/', getDetalis)

module.exports = router