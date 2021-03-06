const {Schema, model, SchemaTypes } = require('mongoose')
const product  = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  value: Number,
  img: String,
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

product.method('toClient', function() {
    const product = this.toObject()
    product.id = product._id
    delete product._id
    return product
  })

module.exports = model('Product', product)