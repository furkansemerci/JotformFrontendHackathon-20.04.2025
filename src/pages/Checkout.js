import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/checkoutService';
import '../App.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, calculateTotal, cartItemCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState(null);
  
  const [customerInfo, setCustomerInfo] = useState({
    fullname: '',
    address: '',
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const orderData = {
        customerInfo,
        items: cart.map(item => {
          let formattedImage;
          try {
            if (typeof item.image === 'string' && item.image.startsWith('[')) {
              formattedImage = item.image;
            } else if (Array.isArray(item.image)) {
              formattedImage = JSON.stringify(item.image);
            } else {
              formattedImage = JSON.stringify([item.image]);
            }
          } catch (e) {
            console.error("Failed to format image data:", e);
            formattedImage = "[]";
          }
          
          return {
            ...item,
            image: formattedImage,
          };
        }),
      };
      
      const result = await submitOrder(orderData);
      console.log('Order submitted successfully:', result);
      
      clearCart();
      setOrderComplete(true);
      
    } catch (err) {
      setError(`Failed to submit order: ${err.message}`);
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="app">
        <Navbar cartItemCount={0} />
        <div className="checkout-container">
          <div className="order-success">
            <h2>Order Completed!</h2>
            <p>Thank you for your purchase.</p>
            <button 
              className="continue-shopping-button"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount} />
      
      <div className="checkout-container">
        <h2>Checkout</h2>
        
        {error && <div className="checkout-error">{error}</div>}
        
        <div className="checkout-layout">
          <div className="checkout-form-container">
            <h3>Shipping Information</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={customerInfo.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                
              
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
            
                
              </div>
              
              <button 
                type="submit" 
                className="place-order-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items-summary">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item-summary">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-total">
                  <p>Total: <span>${calculateTotal().toFixed(2)}</span></p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;