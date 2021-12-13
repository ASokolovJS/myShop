const {Schema, model} = require('mongoose')
const orderSchema = new Schema ({
  products: [{
    product: {
      type: Object,
      required: true,
    },
    productValue: Number,
  }],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  numberOrder: Number,
  date: {
    type: Date,
    default: Date.now
  },
  payment: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Order',orderSchema)
