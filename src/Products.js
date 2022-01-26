import  { useContext } from 'react'
import { ProductsContext } from './CartContext/ProductsContext'
import "./Products.css"


const Products = () => {

    const { products } = useContext(ProductsContext);
    console.log(products)

    return (
        <>
            {products.length !== 0 && <h1>Productos</h1>}
            <div className='products-container'>
                {products.length === 0 && <span id="loading">Cargando...</span>}
                <div className="line-row"></div>
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImage} alt="not found" />
                        </div>
                        <div className='product-name'>
                            <p>{product.ProductName}</p>
                        </div>
                        <div className='product-price'>
                             <p>{product.ProductPrice} ARS</p>
                    </div>
                        <button className='addcart-btn' >ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Products