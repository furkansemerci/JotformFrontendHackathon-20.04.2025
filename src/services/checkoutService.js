export const submitOrder = async (cartItems) => {
  const formId = '251074262565961';
  const apiKey = '33f6c9c0300861a5761725edcc523334';
  const apiUrl = `https://api.jotform.com/form/${formId}/submissions?apiKey=${apiKey}`;
  
  const formData = new FormData();
  
  formData.append('submission[34]', cartItems.customerInfo.fullname);
  formData.append('submission[36]', cartItems.customerInfo.address);
  
  const productsObj = {};
  
  cartItems.items.forEach((item, index) => {
    productsObj[index] = JSON.stringify({
      pid: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description || '',
      images: item.image, 
      cid: "",
      connectedCategories: [],
      connectedProducts: [],
      corder: "",
      customPrice: "",
      customPriceSource: "0",
      fitImageToCanvas: "No",
      hasExpandedOption: "",
      hasSpecialPricing: "",
      isLowStockAlertEnabled: "No",
      isStockControlEnabled: "No",
      lowStockValue: "",
      options: [{
        type: "quantity",
        name: "Quantity",
        defaultQuantity: "",
        specialPricing: false,
        expanded: false,
        selected: "1"
      }],
      order: index.toString(),
      paymentUUID: `01937a3bb${Math.random().toString(36).substr(2, 16)}`,
      period: "Monthly",
      recurringtimes: "No Limit",
      required: "",
      selected: "1",
      setupfee: "",
      showSubtotal: "1",
      stockQuantityAmount: "",
      trial: "",
      item_id: index + 1,
      currency: "USD",
      gateway: "payment",
      paymentType: "product"
    });
  });
  
  const total = cartItems.items.reduce((sum, item) => 
    sum + (parseFloat(item.price) * parseInt(item.quantity)), 0
  ).toFixed(2);
  
  productsObj.paymentArray = JSON.stringify({
    product: cartItems.items.map(item => 
      `${item.name} (Amount: ${parseFloat(item.price).toFixed(2)} USD, Quantity: ${item.quantity})`
    ),
    currency: "USD",
    total: total,
    shortView: {
      products: cartItems.items.map(item => {
        let image = "";
        try {
          if (typeof item.image === 'string') {
            const parsedImages = JSON.parse(item.image);
            image = Array.isArray(parsedImages) ? parsedImages[0] : parsedImages;
          }
        } catch (e) {
          console.error("Error parsing image:", e);
        }
        
        return {
          title: item.name,
          image: image
        };
      })
    }
  });
  
  formData.append('submission[7]', JSON.stringify(productsObj));
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`JotForm submission failed: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Order submission error:', error);
    throw error;
  }
};