import dbConnect from '../../../utils/dbConnect'
import itemService from '../../../services/itemService'
import Item from '../../../models/Item'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id
  const buyerId = await itemService.getBuyerId(id)

  if (userId !== buyerId) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const item = await itemService.getOne(id)
        res.status(200).json(Item.format(item))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const item = await itemService.updateOne(id, req.body)
        res.status(200).json(Item.format(item))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await itemService.deleteOne(id)
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
