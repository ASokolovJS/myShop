const getDetalis = (req,res) => {
  res.render('details', {
    title: "Реквизиты",

  })
}

module.exports = {getDetalis}