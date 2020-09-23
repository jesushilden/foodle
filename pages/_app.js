import React from 'react'
import App from 'next/app'
import axios from 'axios'
import '../styles/globals.css'
import Layout from '../components/Layout'
import UserContext from '../components/UserContext'

export default class MyApp extends App {
  state = {
    user: null
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get('/api/login')
      const user = response.data
      this.setState({ user })
    } catch (e) {
    }
  }

  login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password })
    const user = response.data
    alert('User with name ' + user.name + ' logged in.')
    this.setState({ user })
  }

  logout = async () => {
    await axios.post('/api/logout')
    alert(this.state.user.name + ' logged out.')
    this.setState({ user: null })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <UserContext.Provider value={{ user: this.state.user, login: this.login, logout: this.logout }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    )
  }
}