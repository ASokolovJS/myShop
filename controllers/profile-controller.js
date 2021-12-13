const User = require('../models/user');
const {validationResult} = require('express-validator')

const getProfile = async (req, res) => {

  res.render("./profile/profile",{
    title: 'Профиль',
    isProfile: true,
    user: req.user.toObject()
  })
}

const postProfile = async (req, res) =>{
  
  try {
   const user = await User.findById(req.user._id)
   const {phone} = req.body
   const err = validationResult(req)
     if(!err.isEmpty()){
       req.flash('errorEdit', err.array()[0].msg)
       return res.status(422).redirect('/profile')
     }
   const toChange = {
      name: req.body.name,
      phone,
      adress: req.body.adress,
    }
    if(req.file){
      toChange.avatarURL = req.file.path
    }
 
    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
  } catch (error) {
    console.log(error);
  }
 }

module.exports = { getProfile, postProfile}