import { DEMO_PRODUCTS } from '../constants/demoData';
import { JOTFORM_CONFIG } from '../config';

export const fetchProductsFromJotForm = async () => {
  try {
    const response = await fetch(
      `https://api.jotform.com/form/${JOTFORM_CONFIG.formID}/payment-info?apiKey=${JOTFORM_CONFIG.apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`JotForm API error: ${response.status}`);
    }
    
    const data = await response.json();
    
   
    const formattedProducts = data.content.products.map(product => ({
      id: product.pid,
      name: product.name,
      price: parseFloat(product.price),
      description: product.description || '',
      image: product.images 
    }));
    
    return formattedProducts;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};