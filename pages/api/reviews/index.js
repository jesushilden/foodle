import dbConnect from '../../../utils/dbConnect'
import reviewService from '../../../services/reviewService'
import Review from '../../../models/Review'
import authenticate from '../../../utils/authenticate'

export default async (req, res) => {
  await dbConnect()
  const userId = authenticate(req.cookies.jwt)

  switch (req.method) {
    case 'GET':
      try {
        const reviews = await reviewService.getAll()
        res.status(200).json(reviews.map(Review.format))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json('You have to be authenticated to execute this task.')
        }
        const review = await reviewService.create({ ...req.body, author: userId })
        res.status(200).json(Review.format(review))
      } catch (error) {
        res.status(400).json(error.message)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
