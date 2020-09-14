import Product from '../models/Product'

const getAll = async () => {
  return await Product.find({})
}

const getOne = async (id) => {
  return await Product.findById(id)
}

const getOwnerId = async (id) => {
  const product = await Product.findById(id, { _id: false, owner: true })
  return String(product.owner)
}

const create = async (productObject) => {
  const product = new Product({
      name: productObject.name,
      description: productObject.description,
      quantity: productObject.quantity,
      owner: productObject.owner,
      price: productObject.price,
      picture: productObject.picture
  })

  return await product.save()
}

const updateOne = async (id, productObject) => {

  const updateObject = {
    name: productObject.name,
    description: productObject.description,
    quantity: productObject.quantity,
    price: productObject.price,
    picture: productObject.picture
  }

  return await Product.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await Product.findByIdAndDelete(id)
}

export default {
  getAll,
  getOne,
  getOwnerId,
  create,
  updateOne,
  deleteOne
}