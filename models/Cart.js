import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a buyer for the cart.']
  },
  payed: {
    type: Boolean,
    required: true
  }
})

CartSchema.statics.format = (cart) => ({
  _id: cart._id,
  buyer: cart.buyer,
  payed: cart.payed
})

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)