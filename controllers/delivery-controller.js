

const getDelivery = (req, res) => {

  res.render("delivery",{
    title: "Информация о доставке",
    isDelivery: true,
  })
}

module.exports = {getDelivery}