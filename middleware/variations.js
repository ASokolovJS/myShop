module.exports = function(req, res, next) {
  res.locals.isAuth = req.session.isAuthen
  res.locals.isAdmin = req.session.isAdmin
  res.locals.csrf = req.csrfToken()
  next()
}