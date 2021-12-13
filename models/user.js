const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: String,
  phone: Number,
  adress: String,
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  promo: String,
  avatarURL: String,
  cart:{
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      productValue: Number,
    }]
  }
})

userSchema.methods.addToCart = function(product, value){
  const items = [...this.cart.items]
  const idx = items.findIndex(c =>{
    return c.productId.toString() === product._id.toString()
  })

  if(idx >= 0) {
    items[idx].count = items[idx].count + 1
    items[idx].productValue = items[idx].productValue + value
  }else{
    if(value !== "NaN"){
      items.push({
        productId: product._id,
        count: 1,
        productValue: value
      })
    }else{
      items.push({
        productId: product._id,
        count: 1,
        productValue: 50
      })
    }
    

  }
    this.cart = {items}
    return this.save()

}

userSchema.methods.removeFromCartFull = function(id){
  let items = [...this.cart.items]
  
  const idx = items.findIndex(c => {
    return c.productId.toString() === id.toString()
  })
  items = items.filter(c => c.productId.toString() !== id.toString())
  
  this.cart = {items}
  return this.save()
}


userSchema.methods.removeFromCart = function(id){
  let items = [...this.cart.items]
  
  const idx = items.findIndex(c => {
    return c.productId.toString() === id.toString()
  })
  if (items[idx].productValue <= 50){
    items = items.filter(c => c.productId.toString() !== id.toString())
  }else{
    items[idx].productValue = items[idx].productValue - 50
  }
  this.cart = {items}
  return this.save()
}

userSchema.methods.clearCart = function(){
  this.cart = {items: []}
  return this.save()
}

module.exports = model("User",userSchema)