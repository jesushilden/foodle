import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const addUser = async () => {
    const response = await axios.post('/api/users', { name, email, password })
    const user = response.data
    alert('User with name ' + user.name + ' created.')
  }

  return (
    <div>
      <Head>
        <title>Foodle - Signup</title>
      </Head>
      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <button onClick={addUser}>Signup</button>

    </div>
  )
}

export default SignupPage 