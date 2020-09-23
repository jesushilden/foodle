import Head from 'next/head'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Foodle</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
      <footer>{'I`m here to stay'}</footer>
    </div>
  )
}

export default Layout