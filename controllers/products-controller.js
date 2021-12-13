const Product = require("../models/product");

function cost(products){
  for(item of products){
    item.price = (item.price / 10).toFixed(0)
  }
  return products
}

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.render("products", {
    title: "Магазин снеков - # SNACK CASE",
    isProduct: true,
    products: cost(products),
  });
}
const getEditProduct = async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const product = await Product.findById(req.params.id);
  res.render("edit", {
    title: `${product.title}`,
    product
  });
}
const postRemoveProduct = async (req, res) =>{
  try {
    await Product.deleteOne({_id: req.body.id})
     res.redirect('/products')
  } catch (error) {
    console.log(error);
  }
 }
const postEditProducts = async (req, res) => {
  const {id} = req.body
  delete req.body.id 
  await Product.findByIdAndUpdate(id, req.body);
  res.redirect("/products");
}
const getInfoProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("product", {
    title: `Снек - ${product.title}`,
    product,
  });
}

module.exports = { getProducts, getEditProduct, postRemoveProduct, postEditProducts, getInfoProduct}