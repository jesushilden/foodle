import dbConnect from '../../../utils/dbConnect'
import userService from '../../../services/userService'
import User from '../../../models/User'

export default async (req, res) => {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const users = await userService.getAll()
        res.status(200).json(users.map(User.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        const user = await userService.create(req.body)
        res.status(200).json(User.format(user))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
