import React from "react";
import {Link} from 'react-router-dom'
import ProductDetails from "../pages/productDetails";
function ProductCard({ product, addToCart }) {
  const dataPass = {product};
 
  return (
    <div className="product-card">

      
      
      <Link to={{pathname: `/product/${product.id}`}} state= {dataPass}>
        <img src={JSON.parse(product.image)[0]} alt={product.name} className="product-image" />
      </Link>
       
     
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button 
        className="add-to-cart-button"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;