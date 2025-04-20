import React from 'react';
import {Link} from 'react-router-dom';
function Navbar({ cartItemCount, toggleCart }) {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/"><h1>FestShopping</h1></Link>
      </div>
      <div className="cart-icon" onClick={toggleCart}>
        <span className="material-icons">shopping_cart</span>
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </div>
    </header>
  );
}

export default Navbar;



