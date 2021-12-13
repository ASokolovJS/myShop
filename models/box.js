const {Schema, model} = require('mongoose')
const boxSchema = new Schema ({
  title: {
    type: String,
    required: true 
  },
  value: Number,
  price: Number,
  img: String,

})

module.exports = module("Box", boxSchema)