import { useState, useContext } from 'react'
import Head from 'next/head'
import UserContext from '../components/UserContext'

const LoginPage = () => {
  const { login } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <Head>
        <title>Foodle - Login</title>
      </Head>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={() => login(email, password)}>Login</button>
    </div>
  )
}

export default LoginPage