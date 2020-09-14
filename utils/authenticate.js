import jwt from 'jsonwebtoken'

export default (token) => {
  if (!token) return
  const decodedToken = jwt.verify(token, process.env.SECRET)
  return decodedToken._id
}