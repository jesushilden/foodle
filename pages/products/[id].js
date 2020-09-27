import productService from '../../services/productService'
import Product from '../../models/Product'

const ProductPage = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const response = await productService.getOne(id)
  const product = JSON.parse(JSON.stringify(Product.format(response)))
  return {
    props: {
      product
    }
  }
}

export default ProductPage
