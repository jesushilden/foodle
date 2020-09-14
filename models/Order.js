import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a buyer for the order.']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product for the order.']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount for the order.'],
    min: [1, 'Amount can not be lower than 1.']
  },
  delivered: {
    type: Boolean,
    required: [true, 'Please provide specify delivered for the order.']
  }
})

OrderSchema.statics.format = (order) => ({
  _id: order._id,
  buyer: order.buyer,
  product: order.product,
  amount: order.amount,
  delivered: order.delivered
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)