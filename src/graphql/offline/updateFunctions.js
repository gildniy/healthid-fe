export const createSaleUpdateFunc = (cache, { data: { createSale } }) => {
  // will update sold productBatches here
  const { products } = createSale || {};

  return () => { };
};

export default createSaleUpdateFunc;
