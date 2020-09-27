import cookie from 'cookie'
import cartService from '../services/cartService'
import itemService from '../services/itemService'
import Cart from '../models/Cart'
import Item from '../models/Item'
import authenticate from '../utils/authenticate'

const CartPage = ({ cart, items }) => {
  return (
    <div>
      <h1>{cart._id}</h1>
      <h2>{cart.payed ? 'Payed' : 'Not payed'}</h2>
      <ul>
        {items && items.map(item =>
          <li key={item._id}>
            {item.amount + " of " + item.product}
          </li>)}
      </ul>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie)
    const userId = authenticate(cookies.jwt)
    const cartResponse = await cartService.getOrCreateCartByBuyerId(userId)
    const cart = JSON.parse(JSON.stringify(Cart.format(cartResponse)))
    const itemsResponse = await itemService.getAllByCartId(cart._id)
    const items = JSON.parse(JSON.stringify(itemsResponse.map(Item.format)))
    return { props: { cart, items } }
  } catch (exception) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/login')
    context.res.end()
    return { props: {} }
  }
}

export default CartPage
