import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters.'],
  },
  description: {
    type: String,
    maxlength: [3000, 'Description cannot be more than 3000 characters.']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide a quantity for this product.'],
    min: [0, 'Quantity can not be lower than 0.']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an owner for the product.']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product.']
  },
  picture: {
    type: String,
    maxlength: [2048, 'Picture url can not be more than 2048 characters.']
  }
})

ProductSchema.statics.format = (product) => ({
  _id: product._id,
  name: product.name,
  description: product.description,
  quantity: product.quantity,
  owner: product.owner,
  price: product.price,
  picture: product.picture
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)