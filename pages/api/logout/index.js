import cookie from 'cookie'

export default async (req, res) => {

  switch (req.method) {
    case 'POST':
      try {
        res.setHeader('Set-Cookie', cookie.serialize('jwt', '', { maxAge: -1, path: '/' }))
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
