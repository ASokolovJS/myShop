const getPayment = (req, res) =>{
  res.render("./payment/payment", {
    title: "Оплата",
    isPayment: true
  })
}

const getInfoPayment = (req, res) =>{
  res.render("./payment/info", {
    title: "Информация о платежах",
    isInfo: true
  })
}

const getReturn = (req,res) => {
  res.render('./payment/return', {
    title: "Правила возврата товара"
  })
}

module.exports = {getPayment, getInfoPayment, getReturn}