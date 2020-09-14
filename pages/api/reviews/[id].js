import dbConnect from '../../../utils/dbConnect'
import reviewService from '../../../services/reviewService'
import Review from '../../../models/Review'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  const id = req.query.id
  const authorId = await reviewService.getAuthorId(id)

  if (userId !== authorId) {
    return res.status(403).json('You do not have the permission to execute this task.')
  }

  switch (req.method) {
    case 'GET':
      try {
        const review = await reviewService.getOne(id)
        res.status(200).json(Review.format(review))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'PUT':
      try {
        const review = await reviewService.updateOne(id, req.body)
        res.status(200).json(Review.format(review))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'DELETE':
      try {
        await reviewService.deleteOne(id)
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
