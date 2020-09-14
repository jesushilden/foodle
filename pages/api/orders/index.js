import dbConnect from '../../../utils/dbConnect'
import orderService from '../../../services/orderService'
import Order from '../../../models/Order'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  switch (req.method) {
    case 'GET':
      try {
        const orders = await orderService.getAll()
        res.status(200).json(orders.map(Order.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json('You have to be authenticated to execute this task.')
        }
        const order = await orderService.create({ ...req.body, buyer: userId })
        res.status(200).json(Order.format(order))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
