import dbConnect from '../../../utils/dbConnect'
import cartService from '../../../services/cartService'
import Cart from '../../../models/Cart'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id
  const buyerId = await cartService.getBuyerId(id)

  if (userId !== buyerId) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const cart = await cartService.getOne(id)
        res.status(200).json(Cart.format(cart))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const cart = await cartService.updateOne(id, req.body)
        res.status(200).json(Cart.format(cart))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await cartService.deleteOne(id)
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
