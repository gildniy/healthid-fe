export const product1 = {
  id: '1',
  productName: 'Panadol',
  skuNumber: '000261',
  description: 'Nice meds, they mess you real good',
  brand: 'Stans',
  manufacturer: 'Stans',
  vatStatus: false,
  quantityInStock: 85,
  salesPrice: 408.0,
  nearestExpiryDate: '2019-08-13',
  loyaltyWeight: 5,
  tags: [],
  productCategory: {
    id: '15',
    name: 'pain killer'
  },
  dispensingSize: {
    id: '1',
    name: 'tablets'
  },
  preferredSupplier: {
    id: '2',
    name: 'sean2'
  },
  backupSupplier: {
    id: '2',
    name: 'sean2'
  }
};

export const product2 = {
  id: '2', name: 'paracitamal', sku: '47'
};

export const products = [product1, product2];

export const columns = ['id', 'product name', 'sku'];
