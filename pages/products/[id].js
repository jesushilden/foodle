import axios from 'axios'
import cookie from 'cookie'
import { useState } from 'react'
import productService from '../../services/productService'
import cartService from '../../services/cartService'
import Product from '../../models/Product'
import Cart from '../../models/Cart'
import authenticate from '../../utils/authenticate'


const ProductPage = ({ product, cart }) => {
  const [amount, setAmount] = useState(1)

  const addToCart = async () => {
    await axios.post('/api/items', { cart: cart._id, product: product._id, amount })
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {cart && <input
        name="amount"
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(e.target.value)} />}
      {cart && <button onClick={addToCart}>Add to cart</button>}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const response = await productService.getOne(id)
  const product = JSON.parse(JSON.stringify(Product.format(response)))

  try {
    const cookies = cookie.parse(context.req.headers.cookie)
    const userId = authenticate(cookies.jwt)
    const cartResponse = await cartService.getOrCreateCartByBuyerId(userId)
    const cart = JSON.parse(JSON.stringify(Cart.format(cartResponse)))
    return {
      props: {
        product,
        cart
      }
    }
  } catch (exception) {
    return {
      props: {
        product,
        cart: null
      }
    }
  }

}

export default ProductPage
