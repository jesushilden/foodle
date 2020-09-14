import dbConnect from '../../../utils/dbConnect'
import productService from '../../../services/productService'
import Product from '../../../models/Product'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  switch (req.method) {
    case 'GET':
      try {
        const products = await productService.getAll()
        res.status(200).json(products.map(Product.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json('You have to be authenticated to execute this task.')
        }
        const product = await productService.create({ ...req.body, owner: userId })
        res.status(200).json(Product.format(product))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
    