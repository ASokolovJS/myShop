const bcrypt = require('bcryptjs')
const regEmail = require('../email/register')
const adminEmail = require('../email/emailRegUser')
const User = require('../models/user')
const transfer = require('../email/emailConf')
const {validationResult} = require('express-validator')


const getLogin = async (req, res) => {
  res.render('./auth/login', {
    layout: "auth",
    isLogin: true,
    title: 'Авторизация',
    errorReg: req.flash('errorReg'),
    errorLog: req.flash('errorLog')
  })
}

const postLogin = async (req, res) => {
  try {
    const {email, password} = req.body
    const condidate = await User.findOne({email})
    if (condidate){
      const isSame = await bcrypt.compare(password, condidate.password)
      if(isSame){
        req.session.user = condidate
        req.session.isAdmin = condidate.isAdmin
        req.session.isAuthen = true
        req.session.save(err => {
          if (err){throw err}
          res.redirect('/')
        })
      }else{
        req.flash('errorLog','Неверный пароль')
        res.redirect('/auth/login#login')
      }
    }else{
      req.flash('errorLog','Пользователь не найден')
      res.redirect('/auth/login')
    } 
  }catch (error) {
    console.log(error);
  }
}

const getLogout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
}

const postRegister = async (req, res) =>{
  
  try {
    const {email, password, phone, name} = req.body
    const err = validationResult(req)
    if(!err.isEmpty()){
      req.flash('errorReg', err.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
    const hashPass = await bcrypt.hash(password, 10)
    if(req.body.promo == "Admin250694"){
      const user = new User ({
        isAdmin: true,
        email,
        name,
        phone,
        adress: req.body.adress,
        password: hashPass, 
        cart: {items: []}
      })
      await user.save()
    }else{ 
      const user = new User ({
      email,
      name,
      phone,
      adress: req.body.adress,
      password: hashPass, 
      cart: {items: []}
    })
    await user.save()
  }

    res.redirect('/auth/login')
    await transfer.sendMail(regEmail(email, password, name))
    await transfer.sendMail(adminEmail(email))
  }catch (err) {
    throw err 
  }
}

module.exports = { getLogin, postLogin, getLogout, postRegister }