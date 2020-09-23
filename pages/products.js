import productService from '../services/productService'
import Product from '../models/Product'

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products && products.map(product => <li key={product._id}>{product.name}</li>)}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await productService.getAll()
  const products = JSON.parse(JSON.stringify(response.map(Product.format)))
  return {
    props: {
      products
    }
  }
}

export default Products
