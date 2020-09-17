import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: [true, 'Please provide a cart for the item.']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product for the item.']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount for the item.'],
    min: [1, 'Amount can not be lower than 1.']
  },
  delivered: {
    type: Boolean,
    required: [true, 'Please specify delivered for the item.']
  }
})

ItemSchema.statics.format = (item) => ({
  _id: item._id,
  product: item.product,
  amount: item.amount,
  delivered: item.delivered
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)