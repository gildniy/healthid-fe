
const batchInformation = {
  openDialog: false,
  openModal: false,

  singleBatch: {
    batchId: '',
    productId: '',
    productName: '',
    dateReceived: new Date().toISOString().split('T')[0],
    batchNumber: '',
    supplier: '',
    supplierId: '',
    expiryDate: new Date().toISOString().split('T')[0],
    costPerItem: '',
    quantityReceived: '',
    deliveryPromptness: '',
    serviceQuality: '',
    notes: '',
  },
  initialBatchState: {
    productId: '',
    productName: '',
    dateReceived: '',
    batchNumber: '',
    supplier: '',
    supplierId: '',
    expiryDate: '',
    costPerItem: '',
    quantityReceived: '',
    deliveryPromptness: '',
    serviceQuality: '',
    notes: '',
  },
  batch: {
    supplierOrderFormId: '',
    productBatches: [],
    batchSize: ''
  },
  orderBatches: [],
  batchSize: ''
};

export default batchInformation;
