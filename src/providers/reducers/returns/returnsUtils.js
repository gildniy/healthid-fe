
const BatchRow = ({
  productName,
  quantityBought,
  quantityReturned: quantity,
  salesPrice,
  productId,
  saleDetailId,
  note,
  resellable,
  reason
}) => ({
  productId,
  productName,
  quantity,
  quantityBought,
  salesPrice,
  resellable,
  reason,
  note,
  saleDetailIds: [saleDetailId]
});
export const aggregateBatches = (toBeReturnedBatches) => {
  const aggregatedBatches = new Map();
  let returnTotal = 0;
  toBeReturnedBatches.forEach((item) => {
    const id = `${item.productId}`;
    returnTotal += item.quantityReturned * item.salesPrice;
    const productInfo = aggregatedBatches.get(id);
    if (productInfo) {
      productInfo.quantity += item.quantityReturned;
      productInfo.quantityBought += item.quantityBought;
      productInfo.note = item.note;
      productInfo.resellable = item.resellable;
      productInfo.saleDetailIds.push(`${item.saleDetailId}`);
      aggregatedBatches.set(id, productInfo);
    } else {
      aggregatedBatches.set(id, BatchRow(item));
    }
  });
  return { aggregatedBatches, returnTotal };
};
export const toggleSelectedBatch = ({ toBeReturnedBatches }, payload) => {
  const {
    id,
    quantity: quantityBought,
    batch: { id: productBatchId },
    product: { id: productId, productName },
    price
  } = payload;
  const batchExists = toBeReturnedBatches.get(`${id}`);
  if (batchExists) {
    toBeReturnedBatches.delete(`${id}`);
  } else {
    const batch = {
      productName,
      productBatchId,
      productId,
      saleDetailId: id,
      quantityBought,
      salesPrice: price,
      quantityReturned: 1,
      resellable: false,
      reason: 'Select',
      note: ''
    };
    toBeReturnedBatches.set(`${id}`, batch);
  }
  return { toBeReturnedBatches };
};
export const removeFromCart = ({ toBeReturnedBatches }, payload) => {
  payload.forEach(item => toBeReturnedBatches.delete(`${item}`));
  return { toBeReturnedBatches, ...aggregateBatches(toBeReturnedBatches) };
};
export const setProductNote = ({ toBeReturnedBatches },
  { clickedCartItem: { saleDetailIds }, freshNote }) => {
  saleDetailIds.forEach((id) => {
    const batch = toBeReturnedBatches.get(`${id}`);
    batch.note = freshNote;
    toBeReturnedBatches.set(`${id}`, batch);
  });
  return { toBeReturnedBatches, ...aggregateBatches(toBeReturnedBatches) };
};
export const changeReturnQuantity = ({ toBeReturnedBatches },
  { saleDetailId, quantity }) => {
  const batch = toBeReturnedBatches.get(`${saleDetailId}`);
  if (batch) {
    batch.quantityReturned = quantity;
    toBeReturnedBatches.set(`${saleDetailId}`, batch);
  }
  return { toBeReturnedBatches };
};
export const discardReturn = () => ({
  aggregatedBatches: new Map(),
  toBeReturnedBatches: new Map(),
  returnTotal: 0,
  dateSold: '',
  timeSold: '',
  customer: null
});
export const setReturnReason = ({ toBeReturnedBatches },
  { item: { saleDetailIds }, reason }) => {
  saleDetailIds.forEach((id) => {
    const batch = toBeReturnedBatches.get(`${id}`);
    batch.reason = reason;
    toBeReturnedBatches.set(`${id}`, batch);
  });
  return { toBeReturnedBatches, ...aggregateBatches(toBeReturnedBatches) };
};
export const toggleItemSellable = ({ toBeReturnedBatches },
  { saleDetailIds }) => {
  saleDetailIds.forEach((id) => {
    const batch = toBeReturnedBatches.get(`${id}`);
    batch.resellable = !batch.resellable;
    toBeReturnedBatches.set(`${id}`, batch);
  });
  return { toBeReturnedBatches, ...aggregateBatches(toBeReturnedBatches) };
};
