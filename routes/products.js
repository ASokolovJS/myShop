const { Router } = require("express");
const router = Router();
const { getProducts, getEditProduct, postRemoveProduct, postEditProducts, getInfoProduct} = require('../controllers/products-controller');
const authSecret = require('../middleware/authSecret')

router.get("/", getProducts);

router.get("/:id/edit", authSecret, getEditProduct);

router.post('/remove', authSecret, postRemoveProduct)

router.post("/edit", authSecret, postEditProducts);

router.get("/:id", getInfoProduct);

module.exports = router;
