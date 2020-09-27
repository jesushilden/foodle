import cookie from 'cookie'
import userService from '../services/userService'
import User from '../models/User'
import authenticate from '../utils/authenticate'

const ProfilePage = ({ user }) => {
  return (
    <div>{user.name}</div>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie)
    const userId = authenticate(cookies.jwt)
    const response = await userService.getOne(userId)
    const user = JSON.parse(JSON.stringify(User.format(response)))
    return { props: { user } }
  } catch (exception) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/login')
    context.res.end()
    return { props: {} }
  }
}

export default ProfilePage
