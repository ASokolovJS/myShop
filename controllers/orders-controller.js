const Order = require("../models/order");
const User = require('../models/user');
const Prod = require('../models/product');
const transfer = require('../email/emailConf')
const orderEmail = require('../email/emailOrder')
const infoOrderEmail = require('../email/emailInfoOrder')
const request = require('request');
const order = require("../models/order");
const key = require('../keys')

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({"user.userId": req.user._id})
      .populate('user.userId')
    if(req.user.promo == "NEW10" ){
      if(orders.length <= 1){
        res.render("orders", {
          title: "Заказы",
          isOrders: true,
          orders: orders.map( o => {
            return {
              ...o._doc,
              price: o.products.reduce((total, c) => {
                return total += (c.productValue * (c.product.price / 1000)) * 0.9
              },0)
            }
          }),
          numberOreder: order.numberOrder,
          login: key.PAY_LOGIN,
          password: key.PAY_PASSWORD
        })
      }else{
        res.render("orders", {
          title: "Заказы",
          isOrders: true,
          orders: orders.map( o => {
            return {
              ...o._doc,
              price: o.products.reduce((total, c) => {
                return total += (c.productValue * (c.product.price / 1000))
              },0)
            }
          }),
          numberOreder: order.numberOrder,
          login: key.PAY_LOGIN,
          password: key.PAY_PASSWORD
        })
      }
    }else{
      res.render("orders", {
        title: "Заказы",
        isOrders: true,
        orders: orders.map( o => {
          return {
            ...o._doc,
            price: o.products.reduce((total, c) => {
              return total += (c.productValue * (c.product.price / 1000))
            },0)
          }
        }),
        numberOreder: order.numberOrder,
        login: key.PAY_LOGIN,
        password: key.PAY_PASSWORD
      })
    }
  } catch (err) {
    console.log(err);
  }
}

const postOrders = async (req, res) => {
  try {
    const userPromo = await User.findById(req.user._id)
    const user = await req.user.populate("cart.items.productId").execPopulate();
    const products = user.cart.items.map((i) => ({
      product: { ...i.productId._doc },
      productValue: i.productValue
    }));
    for(let item of products){
      const prods = await Prod.findById(item.product._id)
      prods.value = prods.value - item.productValue
      await prods.save()
    }
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products,
      numberOrder: (Math.random()).toFixed(4)
    });

    await order.save();
    await userPromo.save()
    await user.clearCart();

    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
}

const postPaycard = (req, res) =>{
  request.post(
    {
      url: 'https://pay.alfabank.ru/payment/rest/register.do',
      form: {
        userName: req.body.userName,
        password: req.body.password,
        orderNumber: req.body.orderNumber,
        amount: ((+req.body.amount).toFixed(0) * 100),
        returnUrl: req.body.returnUrl,
        failUrl: req.body.failUrl,
        description: (req.body.description),
      }
    },
    (err, response, body) => {
      if (err) return res.status(500).send({ message: err })
      console.log(body);
      
      res.render(body)
      
      ;
    }
  )
}

const getSuccessfully = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const order = await Order.findById(req.params.id)
    user.promo = ''
    order.payment = true
    await order.save()
    await user.save()
    await transfer.sendMail(infoOrderEmail())
    await transfer.sendMail(orderEmail(req.user.email, order.numberOrder))
    res.redirect('/orders')
  } catch (error) {
    console.log(error);
  }
}

const getFail = async (req, res) => {
  res.render('payment/failPays',{
    title: 'Результат оплаты'
  })
}


module.exports = {getOrders, postOrders, postPaycard, getSuccessfully, getFail}