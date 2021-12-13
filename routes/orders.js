const { Router } = require("express");
const router = Router();
const authSecret = require('../middleware/authSecret')
const {getOrders, postOrders, postPaycard, getSuccessfully, getFail} = require('../controllers/orders-controller');

router.get("/", authSecret, getOrders);

router.post("/", authSecret, postOrders);

router.post('/paycard', postPaycard)

router.get('/successfully/:id', getSuccessfully)

router.get('/failpay', getFail)

module.exports = router;
