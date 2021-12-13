const Product = require("../models/product");
const User = require("../models/user");
const Order = require('../models/order')

function mapCartItems(carts) {
  return carts.items.map((c) => ({
    ...c.productId._doc,
    id: c.productId.id,
    count: c.count,
    productValue: c.productValue,
  }));
}

function comPrice(product, promo) {
 if(promo == "NEW10"){
  return product.reduce((total, product) => {
    return (total += ((product.price / 1000) * 0.9) * product.productValue);
  }, 0);
 }else{
  return product.reduce((total, product) => {
    return (total += (product.price / 1000) * product.productValue);
  }, 0);
 }
}

const postAddToCard = async (req, res) => {
  const product = await Product.findById(req.body.id);
  await req.user.addToCart(product, +req.body.count);
  res.redirect("/"); 
};

const updateCount = async (req, res) => {
  const itemArr = req.user.cart.items;
  itemArr.map((item) => {
    if (item.productId == req.body.id) {
      item.productValue = item.productValue + 50;
    }
  });
  let user = await User.findById(req.user._id);
  user.cart.items = itemArr;
  await user.save();
  user = await req.user.populate("cart.items.productId").execPopulate();
  const products = mapCartItems(user.cart);
  const cart = {
    products,
    price: comPrice(products),
  };
  res.status(200).json(cart);
};

const deleteProduct = async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.productId").execPopulate();
  const products = mapCartItems(user.cart);
  const cart = {
    products,
    price: comPrice(products),
  };
  res.status(200).json(cart);
};

const deleteProductFull = async (req, res) => {
  await req.user.removeFromCartFull(req.params.id);
  const user = await req.user.populate("cart.items.productId").execPopulate();
  const products = mapCartItems(user.cart);
  const cart = {
    products,
    price: comPrice(products),
  };
  res.status(200).json(cart);
}

const getListUserAndCard = async (req, res) => {
  const user = await req.user.populate("cart.items.productId").execPopulate();
  const products = mapCartItems(user.cart);
  const orders = await Order.find({"user.userId": req.user._id}).populate('user.userId')
  if (orders.length <= 1){
    res.render("card", {
      title: "Корзина",
      isCard: true,
      products,
      price: comPrice(products, req.user.promo),
    });
  }else{
    res.render("card", {
      title: "Корзина",
      isCard: true,
      products,
      price: comPrice(products),
    });
  }
};

const postPromo = async (req, res) => {
  const user = await User.findById(req.user._id)
  if(!user.promo){
    user.promo = req.body.promo
    await user.save()
    res.redirect('/card')
  }else{
    res.redirect('/card')
  }  
}

module.exports = {
  postAddToCard,
  deleteProduct,
  getListUserAndCard,
  updateCount,
  deleteProductFull,
  postPromo
};
