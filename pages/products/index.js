import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import productService from '../../services/productService'
import Product from '../../models/Product'

const ProductsPage = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const addProduct = async () => {
    const response = await axios.post('/api/products', { name, description, price, quantity })
    const product = response.data
    setProducts(products.concat(product))
  }

  return (
    <div>
      <h1>Products</h1>
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
        <label>Description</label>
        <textarea
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          name="price"
          type="number"
          step=".01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          name="quantity"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={addProduct}>Add product</button>
      <ul>
        {products && products.map(product =>
          <li key={product._id}>
            <Link href={"/products/[id]"} as={`/products/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </li>)}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await productService.getAll()
  const products = JSON.parse(JSON.stringify(response.map(Product.format)))
  return {
    props: {
      initialProducts: products
    }
  }
}

export default ProductsPage
