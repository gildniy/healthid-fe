export const updateBatch = (
  orderBatches,
  batch,
  singleBatch,
  initialBatchState
) => {
  const orderBatchIndex = orderBatches.findIndex(
    btch => btch.supplierOrderFormId === batch.supplierOrderFormId
  );
  const batchIndex = batch.productBatches.findIndex(
    btch => btch.productId === singleBatch.productId
  );

  if (batchIndex !== -1) {
    batch.productBatches[batchIndex] = singleBatch;
  } else {
    batch.productBatches.push(singleBatch);
  }

  if (orderBatchIndex !== -1) {
    orderBatches[orderBatchIndex] = {
      ...orderBatches[orderBatchIndex],
      ...batch
    };
  }

  return {
    SingleBatch: Object.assign({}, initialBatchState),
    orderBatches,
    batch
  };
};

export const getSingleBatch = (
  batch,
  payload,
  initialBatchState
) => {
  const batchFound = batch.productBatches.find(
    btch => btch.productId === payload.productId
  );
  if (batchFound) {
    return {
      singleBatch: { ...batchFound, ...payload }
    };
  }
  return {
    singleBatch: { ...initialBatchState, ...payload }
  };
};
