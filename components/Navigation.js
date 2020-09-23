import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import styles from '../styles/navigation.module.css'
import UserContext from './UserContext'

const Navigation = () => {
  const { user, logout } = useContext(UserContext)

  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <div className={router.pathname === '/' ? styles.activeNavItem : styles.navItem}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div className={router.pathname === '/products' ? styles.activeNavItem : styles.navItem}>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </div>
      {!user && <div className={router.pathname === '/login' ? styles.activeNavItem : styles.navItem}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>}
      {!user && <div className={router.pathname === '/signup' ? styles.activeNavItem : styles.navItem}>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>}
      {user && <div className={styles.navItem}>
        <a onClick={logout}>Logout</a>
      </div>}
    </nav>
  )
}

export default Navigation