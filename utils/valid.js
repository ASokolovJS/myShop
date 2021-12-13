const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValid = [
  body('email')
    .isEmail()
    .withMessage("Введите корректный Email")
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({email: value})
          if (user){
            return Promise.reject('Пользователь существует')
          }
      }catch (e) {
        console.log(e);
      }
  })
    .normalizeEmail(),

  body('password')
    .isLength({min:6, max: 56})
    .withMessage('Пароль должен быть минимум 6 символов')
    .isAlphanumeric()
    .trim(),

  body('confirm')
    .custom((value, {req}) => {
      if(value !== req.body.password){
        throw new Error('Пароли не совпадают')
      }
      return true
    })
    .trim(),

  body('name')
    .isLength({min: 3})
    .withMessage('Имя должно содержать минмум 3 символа')
    .trim(),

  body('phone')
    .isMobilePhone()
    .isLength({min:11, max:11})
    .withMessage("Номер телефона должен быть в формате +7(***)***-**-**")

]

exports.productValid = [
  body('title')
    .isLength({min:3})
    .withMessage('Наименование должно быть более 3 символов')
    .trim(),

  body('price')
    .isNumeric()
    .withMessage('Введите корректную сумму'),
    
  body('value')
    .isNumeric()
    .withMessage('Введите вес товара в гр'),
]

exports.editInfo = [
  body('phone')
    .isMobilePhone()
    .isLength({min:11, max:11})
    .withMessage("Номер телефона должен быть в формате +7(***)***-**-**")
]