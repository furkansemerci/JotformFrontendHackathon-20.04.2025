import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import useProducts from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { products, isLoading, error } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, calculateTotal, cartItemCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount} toggleCart={toggleCart} />
      
      <main className="main-content">
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">
            <p>Error loading products: {error}</p>
            <p>Using demo products instead.</p>
          </div>
        ) : (
          <ProductList products={products} addToCart={addToCart} />
        )}
      </main>

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

export default Home;