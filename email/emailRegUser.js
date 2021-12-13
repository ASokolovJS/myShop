const keys = require('../keys/keys.dev')

module.exports = function (email) {
  return {
    from: keys.EMAIL_LOGIN,
    to: keys.EMAIL_LOGIN,
    subject: 'Регистрация нового пользователя',
    html:
    ` <div style="width: 550px; height: 780px;">
        <div style="height: 100px; text-align: center; font-family: stencil; font-size: 35px;">
          <h1># SNACK CASE</h1>
        </div>
        <hr>
        <div style="height: 500px; text-align: center;">
          <h1>Зарегистрирован пользователь - ${email}</h1>          
        </div>
        <hr>
        <div style="margin-left: 5px;">
          Это автоматическое письмо! Просьба на него не отвечать. Если вы не регистрировались на данном сайте, то сообщите об этом на почту: <b>support@snackcase.ru</b>
        </div>
      </div>
    `
  }
}