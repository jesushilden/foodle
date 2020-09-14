import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an author for the review.']
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product for the review.']
  },
  content: {
    type: String,
    maxlength: [3000, 'Content can not be more than 3000.']
  },
  points: {
    type: Number,
    required: [true, 'Please provide points for the review.'],
    min: [1, 'Points can not be lower than 1.'],
    max: [5, 'Points can not be higher than 5.']
  }
})

ReviewSchema.statics.format = (review) => ({
  _id: review._id,
  author: review.author,
  product: review.product,
  content: review.content,
  points: review.points
})

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema)