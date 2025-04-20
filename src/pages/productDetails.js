import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, calculateTotal, cartItemCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  if (!product) {
    return <p>No product data found.</p>; // handles direct access without state
  }

  let imageUrl = "";
  try {
    const parsedImages = JSON.parse(product.image);
    imageUrl = parsedImages[0];
  } catch (e) {
    console.error("Failed to parse product image:", e);
  }

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount} toggleCart={toggleCart} />
      
      <div className="product-details-container">
        <div className="product-details">
          <h2>{product.name}</h2>
          <img 
            src={imageUrl} 
            alt={product.name} 
            style={{ maxWidth: '300px', marginBottom: '1rem' }} 
          />
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          
          <div className="product-actions">
            <button 
              className="add-to-cart-button" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button 
              className="back-button" 
              onClick={() => navigate(-1)}
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>

      {showCart && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          calculateTotal={calculateTotal}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
};

export default ProductDetails;