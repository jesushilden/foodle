import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const handleSignup = async (name, email, password) => {
  const response = await axios.post('/api/users', { name, email, password })
  const user = response.data
  console.log(user)
  alert('User with name ' + user.name + ' created.')
}

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

      <button onClick={() => handleSignup(name, email, password)}>Signup</button>

    </div>
  )
}

export default Signup 