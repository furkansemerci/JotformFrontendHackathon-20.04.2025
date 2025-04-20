import CartItem from "./CartItem";

function CartContent({ cart, removeFromCart, updateQuantity, calculateTotal }) {
    return (
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
          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </div>
      </>
    );
  }
  
  export default CartContent;