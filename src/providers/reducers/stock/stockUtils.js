export const addQuantities = (batchQuantities, quantityItem) => {
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

export default addQuantities;
