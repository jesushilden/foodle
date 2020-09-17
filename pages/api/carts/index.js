import dbConnect from '../../../utils/dbConnect'
import cartService from '../../../services/cartService'
import Cart from '../../../models/Cart'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  switch (req.method) {
    case 'GET':
      try {
        const carts = await cartService.getAll()
        res.status(200).json(carts.map(Cart.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json('You have to be authenticated to execute this task.')
        }
        const cart = await cartService.create({ ...req.body, buyer: userId })
        res.status(200).json(Cart.format(cart))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
