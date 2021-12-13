const nodemailer = require('nodemailer')
const keys = require('../keys/keys.dev')

const transfer = nodemailer.createTransport({
  host: 'mail.netangels.ru',
  port: 25,
  secure: false,
  auth: {
    user: keys.EMAIL_LOGIN,
    pass: keys.EMAIL_PASSWORD,
  },
})

module.exports = transfer