import Item from '../models/Item'
import Cart from '../models/Cart'
import Product from '../models/Product'

const getAll = async () => {
  return await Item.find({})
}

const getAllByCartId = async (cartId) => {
  return await Item.find({ cart: cartId })
}

const getOne = async (id) => {
  return await Item.findById(id)
}

const getBuyerId = async (id) => {
  const item = await Item.findById(id, { _id: false, cart: true }).populate({
    path: 'cart',
    select: 'buyer',
  })
  return String(item.cart.buyer)
}

const create = async (itemObject) => {
  const cart = await Cart.findById(itemObject.cart)

  if (!cart) {
    throw new Error('The cart does not exist.')
  }

  const product = await Product.findById(itemObject.product)

  if (!product) {
    throw new Error('The product does not exist.')
  }

  const existingItem = await Item.findOne({ cart: itemObject.cart, product: itemObject.product })

  if (existingItem) {
    throw new Error('The cart-product combination already exists.')
  }

  const item = new Item({
    cart: itemObject.cart,
    product: itemObject.product,
    amount: itemObject.amount,
    delivered: false
  })

  return await item.save()
}

const updateOne = async (id, itemObject) => {

  const updateObject = {
    amount: itemObject.amount,
    delivered: itemObject.delivered,
  }

  return await Item.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await Item.findByIdAndDelete(id)
}

export default {
  getAll,
  getAllByCartId,
  getOne,
  getBuyerId,
  create,
  updateOne,
  deleteOne
}