import Order from '../models/Order'
import Product from '../models/Product'

const getAll = async () => {
  return await Order.find({})
}

const getOne = async (id) => {
  return await Order.findById(id)
}

const getBuyerId = async (id) => {
  const order = await Order.findById(id, { _id: false, buyer: true })
  return String(order.buyer)
}

const create = async (orderObject) => {
  const product = await Product.findById(orderObject.product)

  if (!product) {
    throw new Error('Please choose a valid product.')
  }

  const order = new Order({
    buyer: orderObject.buyer,
    product: product._id,
    amount: orderObject.amount,
    delivered: orderObject.delivered
  })

  return await order.save()
}

const updateOne = async (id, orderObject) => {

  const updateObject = {
    amount: orderObject.amount,
    delivered: orderObject.delivered
  }

  return await Order.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await Order.findByIdAndDelete(id)
}

export default {
  getAll,
  getOne,
  getBuyerId,
  create,
  updateOne,
  deleteOne
}