const {validationResult} = require('express-validator');
const Product = require("../models/product");
const User = require('../models/user')
const Orders = require('../models/order');

const getPanel = async (req, res) => {
  const products = await Product.find();
  const users = await User.find()
  const orders = await Orders.find()
  res.render("./admin/panel", {
    title: "Панель Администратора",
    isAdd: true,
    products,
    users,
    orders,
  });
}

const postNewProduct = async (req, res) => {
  const{title, price, value, img} = req.body
  const err = validationResult(req)
  
  try {
    if(!err.isEmpty()){
      return res.status(422).render('./admin/panel', {
        title: "Панель Администратора",
        isAdd: true,
        error: err.array()[0].msg,
        data: {
          title,
          price,
          value,
          img,
        }
      })
    }

    const product = new Product ({
      title,
      price,
      value,
      img,
      userId: req.user
    })
    
    await product.save();
    res.redirect("/panel");

  } catch (error) {
    console.log(error);
  }
}

const postDeletUser = async (req, res) =>{
  try {
    await User.findByIdAndDelete({_id: req.body.id})
    res.redirect("/panel/#user")
  } catch (error) {
    console.log(error);
  }
}


module.exports = { getPanel, postNewProduct, postDeletUser }