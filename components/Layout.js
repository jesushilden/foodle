import Link from 'next/link'
import Head from 'next/head'

const Layout = ({children, title = 'Foodle'}  ) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |
          <Link href="/login">
            <a>Login</a>
          </Link>{' '}
          |
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer>{'I`m here to stay'}</footer>
    </div>
  )
}

export default Layout