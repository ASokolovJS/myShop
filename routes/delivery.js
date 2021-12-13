const {Router} = require("express")
const router = Router()
const {getDelivery} = require('../controllers/delivery-controller');

router.get("/", getDelivery)

module.exports = router