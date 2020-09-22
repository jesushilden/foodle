import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from "next/router"
import styles from '../styles/layout.module.css'

const logout = async () => {
  await axios.post('/api/logout')
}

const Layout = ({ children, title = 'Foodle' }) => {

  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className={styles.nav}>
          <div className={router.pathname === '/' ? styles.activeNavItem : styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div className={router.pathname === '/login' ? styles.activeNavItem : styles.navItem}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
          <div className={router.pathname === '/signup' ? styles.activeNavItem : styles.navItem}>
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </div>
          <div className={styles.navItem}>
            <a onClick={logout}>Logout</a>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>{'I`m here to stay'}</footer>
    </div>
  )
}

export default Layout