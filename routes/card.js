const { Router } = require("express");
const router = Router();
const  { postAddToCard, deleteProduct, getListUserAndCard, updateCount, deleteProductFull, postPromo} = require('../controllers/card-controller')
const authSecret = require('../middleware/authSecret')


router.post("/add", authSecret, postAddToCard);

router.post('/update', authSecret, updateCount)

router.post('/promo', authSecret, postPromo)

router.delete("/remove/:id", authSecret, deleteProduct );

router.delete("/removeFull/:id", authSecret, deleteProductFull );

router.get("/", getListUserAndCard);

module.exports = router;
