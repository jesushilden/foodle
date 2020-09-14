import dbConnect from '../../../utils/dbConnect'
import productService from '../../../services/productService'
import Product from '../../../models/Product'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id
  const ownerId = await productService.getOwnerId(id)

  if (userId !== ownerId) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const product = await productService.getOne(id)
        res.status(200).json(Product.format(product))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const product = await productService.updateOne(id, req.body)
        res.status(200).json(Product.format(product))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await productService.deleteOne(id)
        res.status(204).end()
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
