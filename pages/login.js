import { useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

const handleLogin = async (email, password) => {
  const response = await axios.post('/api/login', { email, password })
  const user = response.data
  console.log(user)
  alert('User with name ' + user.name + ' logged in.')
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <Layout title="Foodle - Login">

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => handleLogin(email, password)}>Login</button>

    </Layout>
  )
}

export default Login 