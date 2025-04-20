import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart({ cart, removeFromCart, updateQuantity, calculateTotal, toggleCart }) {
  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button className="close-cart" onClick={toggleCart}>×</button>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  removeFromCart={removeFromCart} 
                  updateQuantity={updateQuantity} 
                />
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
              </div>
              <Link to="/checkout" className="checkout-button" onClick={toggleCart}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;