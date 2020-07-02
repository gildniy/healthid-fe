export const toggleBatchesForCart = (sell, { selectedBatch, product }) => {
  const { batchesForCart } = sell;
  const batch = batchesForCart.find(({ batchId }) => batchId === selectedBatch.id);

  return !batch
    ? [
      ...batchesForCart,
      {
        productId: product.id,
        batchId: selectedBatch.id,
        quantity: 1,
        price: product.salesPrice,
        discount: 0
      }
    ]
    : batchesForCart.filter(({ batchId }) => batchId !== selectedBatch.id);
};

export const returnCartBatches = (sell) => {
  const { cart, selectedProduct } = sell;
  let batchesForCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id === selectedProduct.id) {
      batchesForCart = cartItem.soldBatches;
    }
  });
  return { batchesForCart };
};

export const batchInputChange = (sell, { selectedBatch, value }) => {
  const { batchesForCart } = sell;
  return batchesForCart.map(batch => (batch.batchId === selectedBatch.id
    ? { ...batch, quantity: value }
    : batch));
};

const addItemToCart = (cart, cartItemToAdd) => {
  const existingCartItem = cart.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    return cart.map(cartItem => (cartItem.id === cartItemToAdd.id
      ? { ...cartItemToAdd }
      : cartItem));
  }
  return [...cart, cartItemToAdd];
};

export const addToCart = (sell) => {
  const { batchesForCart, cart, selectedProduct } = sell;
  const quantitySum = batchesForCart.map(({ quantity }) => quantity)
    .reduce((sum, i) => sum + i, 0);
  const item = {
    ...selectedProduct,
    quantity: quantitySum,
    soldBatches: batchesForCart,
  };
  return {
    cart: addItemToCart(cart, item),
    batchesForCart: []
  };
};

export const removeFromCart = (sell, item) => {
  const { cart } = sell;
  return cart.filter(x => x.id !== item.id);
};

export const addItemNote = (sell, payload) => {
  const { id, note } = payload;
  const { cart } = sell;
  const existingItem = cart.find(item => item.id === id);
  return cart.map(cartItem => (cartItem.id === existingItem.id
    ? { ...cartItem, note }
    : cartItem
  ));
};

export const holdSale = (sell, heldSale) => {
  const { salesOnHold } = sell;
  return [...salesOnHold, heldSale];
};


export const addProducts = (batchQuantities, quantityItem) => {
  const existingQuantities = batchQuantities.find(
    batchQuantity => batchQuantity.id === quantityItem.id
  );
  if (existingQuantities) {
    return batchQuantities.map(batchQuantity => (batchQuantity.id === existingQuantities.id
      ? { ...batchQuantity, quantity: quantityItem.quantity }
      : batchQuantity));
  }

  return [...batchQuantities, quantityItem];
};
