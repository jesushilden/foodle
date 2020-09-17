import dbConnect from '../../../utils/dbConnect'
import itemService from '../../../services/itemService'
import cartService from '../../../services/cartService'
import Item from '../../../models/Item'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  switch (req.method) {
    case 'GET':
      try {
        const items = await itemService.getAll()
        res.status(200).json(items.map(Item.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json('You have to be authenticated to execute this task.')
        }
        const buyerId = await cartService.getBuyerId(req.body.cart)

        if (userId !== buyerId) {
          return res.status(403).json('You do not have the permission to execute this task.')
        }

        const item = await itemService.create({ ...req.body, buyer: userId })
        res.status(200).json(Item.format(item))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
