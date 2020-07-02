import batchTypes from '../../../providers/reducers/batch/batchTypes';

export const Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const addQty = (orderItems, pricefn) => {
  const rows = orderItems.map(detail => ({
    id: detail.id,
    salesPrice: detail.product.salesPrice,
    name: detail.product.productName,
    qtyOrdered: detail.quantity,
    cost: detail.unitCost,
    price: pricefn(detail.quantity, detail.unitCost),
    status: detail.status,
  }));
  return rows;
};

export const checkProductRecieved = (
  context, orderId, row, supplier, qty,
  openModalStatus, openDialogStatus, Promptness, Quality
) => {
  const [, dispatch] = Object.values(context);

  dispatch({
    type: batchTypes.GET_PRODUCT_BATCH,
    payload: {
      orderId,
      batchId: row.id,
      productId: parseInt(row.id, 10),
      productName: row.name,
      dateReceived: new Date().toISOString().split('T')[0],
      expiryDate: new Date().toISOString().split('T')[0],
      supplier: supplier.name,
      costPerItem: row.cost,
      quantityReceived: qty,
      supplierId: supplier.id,
      openModal: openModalStatus,
      openDialog: openDialogStatus,
      deliveryPromptness: Promptness,
      serviceQuality: Quality,
    }
  });
};
