const { Router } = require("express");
const router = Router();
const { 
  getPanel,
  postNewProduct,
  postDeletUser
} = require('../controllers/adminPanel-controller')
const authSecret = require('../middleware/authSecret')
const {productValid} = require('../utils/valid');


router.get("/", authSecret, getPanel);

router.post("/", authSecret, productValid, postNewProduct);

router.post('/deleteUser', authSecret, postDeletUser )

module.exports = router;
