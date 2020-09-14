import Review from '../models/Review'
import Product from '../models/Product'

const getAll = async () => {
  return await Review.find({})
}

const getOne = async (id) => {
  return await Review.findById(id)
}

const getAuthorId = async (id) => {
  const review = await Review.findById(id, { _id: false, author: true })
  return String(review.author)
}

const create = async (reviewObject) => {
  const product = await Product.findById(reviewObject.product)

  if (!product) {
    throw new Error('Please choose a valid product.')
  }

  const review = new Review({
    author: reviewObject.author,
    product: product._id,
    content: reviewObject.content,
    points: reviewObject.points
  })

  return await review.save()
}

const updateOne = async (id, reviewObject) => {

  const updateObject = {
    content: reviewObject.content,
    points: reviewObject.points
  }

  return await Review.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await Review.findByIdAndDelete(id)
}

export default {
  getAll,
  getOne,
  getAuthorId,
  create,
  updateOne,
  deleteOne
}