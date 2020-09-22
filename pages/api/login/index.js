import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import dbConnect from '../../../utils/dbConnect'
import userService from '../../../services/userService'
import User from '../../../models/User'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const userId = authenticate(req.cookies.jwt)
        const user = await userService.getOne(userId)
        res.status(200).json(User.format(user))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        const user = await userService.getOneByEmailAndPassword(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '7d' })
        res.setHeader('Set-Cookie', cookie.serialize('jwt', token, { httpOnly: true, sameSite: true, secure: process.env.NODE_ENV === 'production', maxAge: 604800, path: '/' }))
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
