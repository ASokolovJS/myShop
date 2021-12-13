const keys = require('../keys/keys.dev')

module.exports = function (email, password, name) {
  return {
    from: keys.EMAIL_LOGIN,
    to: email,
    subject: 'Регистрация аккаунта на сайте SnackCase',
    html:
    `<div style="width: 550px; height: 780px;">
      <div style="height: 100px; text-align: center; font-family: stencil; font-size: 35px;">
        <h1># SNACK CASE</h1>
      </div>
      <hr>
      <div style="height: 500px; text-align: center;">
        <h2>Регистрация аккаунта на сайте SnackCase</h2>
        <span>${name}, добро пожаловать в наш магазин!</span>
        <p>Вы успешно зарегистировались на сайте <a href="https://www.snackcase.ru"># SnackCase</a></p>
        <p>Данные заполненные при регистрации:</p>
        <p><b>Логин:</b> ${email}</p>
        <p><b>Пароль:</b> ${password}</p>
      </div>
      <hr>
      <div style="margin-left: 5px;">
        Это автоматическое письмо! Просьба на него не отвечать. Если вы не регистрировались на данном сайте, то сообщите об этом на почту: <b>support@snackcase.ru</b>
      </div>
  </div>
    `
  }
}