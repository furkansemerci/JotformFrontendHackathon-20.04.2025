import React from "react";
import {Link} from 'react-router-dom'
import ProductDetails from "../pages/productDetails";
function ProductCard({ product, addToCart, removeFromCart, updateQuantity }) {
  const dataPass = {product};
  
 
  return (
    <div className="product-card">

      
      
      <Link to={{pathname: `/product/${product.id}`}} state= {dataPass}>
        <img src={JSON.parse(product.image)[0]} alt={product.name} className="product-image" />
      </Link>
       
     
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <div className="cart-item-quantity">
          <button 
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span>{product.quantity || 0}</span>

          <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
            +
          </button>
        </div>
        <div className="cart-item-total">
          ${(product.price * product.quantity).toFixed(2)}
        </div>
        <button 
          className="remove-item" 
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </button>
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