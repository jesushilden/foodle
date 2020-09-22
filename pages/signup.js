import { useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

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
    <Layout title="Foodle - Signup">

      <label>Name</label>
      <input
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={() => handleSignup(name, email, password)}>Signup</button>

    </Layout>
  )
}

export default Signup 