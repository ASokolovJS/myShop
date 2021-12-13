const {Router} = require('express');
const router = Router()
const {getPayment, getInfoPayment, getReturn} = require('../controllers/payment-controller');

router.get('/', getPayment)

router.get('/info', getInfoPayment)

router.get('/return', getReturn)


module.exports = router