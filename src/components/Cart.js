import CartContent from './CartContent';
import EmptyCart from './EmptyCart';

function Cart({ cart, removeFromCart, updateQuantity, calculateTotal, toggleCart }) {
  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button className="close-cart" onClick={toggleCart}>×</button>
        </div>
        
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <CartContent 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity} 
            calculateTotal={calculateTotal} 
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
