import batchTypes from './batchTypes';
import { updateBatch, getSingleBatch } from './batchUtils';

const batchReducers = (batchInformation, action) => {
  const { payload } = action;
  const {
    orderBatches, batch, initialBatchState, singleBatch
  } = batchInformation;
  let orderBatch;
  switch (action.type) {
  case batchTypes.GET_ORDER_BATCH:
    [orderBatch] = orderBatches.filter(
      order => order.supplierOrderFormId === payload.supplierOrderFormId
    );
    if (!orderBatch) {
      orderBatch = {
        ...batch,
        supplierOrderFormId: payload.supplierOrderFormId,
        productBatches: [],
        batchSize: payload.batchSize
      };
      orderBatches.push(orderBatch);
    }
    return { ...batchInformation, batch: orderBatch };
  case batchTypes.GET_PRODUCT_BATCH:
    return {
      ...batchInformation,
      openDialog: payload.openDialog,
      openModal: payload.openModal,
      ...getSingleBatch(batch, payload, initialBatchState)
    };
  case batchTypes.UPDATE_SINGLE_BATCH:
    return {
      ...batchInformation,
      openDialog: { ...batchInformation.openDialog, ...payload },
      singleBatch: { ...singleBatch, ...payload }
    };
  case batchTypes.CLOSE_PRODUCT_BATCH:
    return {
      ...batchInformation,
      openDialog: payload.openDialog,
      openModal: payload.openModal,
    };
  case batchTypes.UPDATE_PRODUCT_BATCH:
    return {
      ...batchInformation,
      openDialog: payload.openDialog,
      openModal: payload.openModal,
      ...updateBatch(orderBatches, batch, singleBatch, initialBatchState)
    };
  default:
    return batchInformation;
  }
};

export default batchReducers;
