const {Router} = require('express');
const router = Router()
const authSecret = require('../middleware/authSecret')
const {editInfo} = require('../utils/valid');
const { getProfile, postProfile} = require('../controllers/profile-controller');


router.get('/', authSecret, getProfile)

router.post('/', editInfo, authSecret, postProfile)

module.exports = router