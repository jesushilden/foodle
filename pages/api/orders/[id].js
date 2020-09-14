import dbConnect from '../../../utils/dbConnect'
import orderService from '../../../services/orderService'
import Order from '../../../models/Order'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id
  const buyerId = await orderService.getBuyerId(id)

  if (userId !== buyerId) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const order = await orderService.getOne(id)
        res.status(200).json(Order.format(order))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const order = await orderService.updateOne(id, req.body)
        res.status(200).json(Order.format(order))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await orderService.deleteOne(id)
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
