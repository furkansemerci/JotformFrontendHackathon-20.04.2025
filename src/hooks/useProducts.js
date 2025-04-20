import { useState, useEffect } from 'react';
import { fetchProductsFromJotForm } from '../services/api';
import { DEMO_PRODUCTS } from '../constants/demoData';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const formattedProducts = await fetchProductsFromJotForm();
        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
        // Fallback to demo products for development
        setProducts(DEMO_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, isLoading, error };
}

export default useProducts;