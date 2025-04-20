function CartItem({ item, removeFromCart, updateQuantity }) {
    return (
      <div className="cart-item">
        <img src={item.image} alt={item.name} className="cart-item-image" />
        <div className="cart-item-details">
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
        </div>
        <div className="cart-item-quantity">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <div className="cart-item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <button 
          className="remove-item" 
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    );
  }
  
  export default CartItem;