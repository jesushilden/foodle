import Cart from '../models/Cart'

const getAll = async () => {
  return await Cart.find({})
}

const getOne = async (id) => {
  return await Cart.findById(id)
}

const getOrCreateCartByBuyerId = async (buyerId) => {
  const cart = await Cart.findOne({ buyer: buyerId, payed: false })

  if (cart) {
    return cart
  } else {
    return create({ buyer: buyerId })
  }

}

const getBuyerId = async (id) => {
  const cart = await Cart.findById(id, { _id: false, buyer: true })
  return String(cart.buyer)
}

const create = async (cartObject) => {
  const existingCart = await Cart.findOne({ buyer: cartObject.buyer, payed: false })

  if (existingCart) {
    throw new Error('You can only have one unpayed cart.')
  }

  const cart = new Cart({
    buyer: cartObject.buyer,
    payed: false
  })

  return await cart.save()
}

const updateOne = async (id, cartObject) => {

  const updateObject = {
    payed: cartObject.payed
  }

  return await Cart.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await Cart.findByIdAndDelete(id)
}

export default {
  getAll,
  getOne,
  getOrCreateCartByBuyerId,
  getBuyerId,
  create,
  updateOne,
  deleteOne
}