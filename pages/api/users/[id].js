import dbConnect from '../../../utils/dbConnect'
import userService from '../../../services/userService'
import User from '../../../models/User'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id

  if (userId !== id) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const user = await userService.getOne(id)
        res.status(200).json(User.format(user))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const user = await userService.updateOne(id, req.body)
        res.status(200).json(User.format(user))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await userService.deleteOne(id)
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
