import Layout from '../components/Layout'
import axios from 'axios'

const Home = ({ user }) => {
  return (
    <Layout>
      <div>{user && user.name} Main page</div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  let user = null

  if (ctx.req.headers.cookie) {
    const response = await axios.get('http://localhost:3000/api/login', { headers: { Cookie: ctx.req.headers.cookie } })
    user = response.data
  }

  return {
    props: {
      user
    }
  }
}

export default Home
