const {Router} = require('express')
const router = Router()
const {registerValid} = require('../utils/valid');
const {getLogin, postLogin, getLogout, postRegister} = require('../controllers/auth-controller')



router.get('/login', getLogin)

router.post('/login', postLogin)

router.get('/logout', getLogout)

router.post('/register', registerValid, postRegister)

module.exports = router