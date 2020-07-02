import { stableSort, getSorting } from '../stock_control/utils/utils';

const filterProductsByStatus = (products, isApproved) => {
  const productList = products.filter(product => product.isApproved === isApproved);
  return productList;
};

export const getFilteredProducts = (products) => {
  const productsList = products.map((product) => {
    const {
      productName, image, productCategory, dispensingSize, skuNumber, markup,
      description, brand, manufacturer, vatStatus, salesPrice, nearestExpiryDate,
      preferredSupplier, backupSupplier, id, quantityInStock, loyaltyWeight, reorderPoint,
      reorderMax, tags, productbatchSet, globalUpc
    } = product;

    const backupSupplierName = backupSupplier ? backupSupplier.name : 'Not Available';
    const preferredSupplierName = preferredSupplier ? preferredSupplier.name : 'Not Available';
    const preferredSupplierDisplayName = preferredSupplier && preferredSupplier.suppliersmetaSet
        && preferredSupplier.suppliersmetaSet.length
      ? preferredSupplier.suppliersmetaSet[0].displayName
      : preferredSupplierName;
    const backupSupplierDisplayName = backupSupplier && backupSupplier.suppliersmetaSet
        && backupSupplier.suppliersmetaSet.length
      ? backupSupplier.suppliersmetaSet[0].displayName
      : backupSupplierName;

    return (
      {
        id,
        globalUpc: globalUpc || 'No UPC',
        productName,
        image,
        productCategory: productCategory ? productCategory.name : 'Not Available',
        dispensingSize: dispensingSize ? dispensingSize.name : 'Not Available',
        skuNumber,
        description,
        brand,
        manufacturer,
        vatStatus: vatStatus.toString(),
        salesPrice,
        markup,
        nearestExpiryDate,
        preferredSupplier: preferredSupplierDisplayName,
        backupSupplier: backupSupplierDisplayName,
        quantityInStock,
        reorderPoint,
        reorderMax,
        loyaltyWeight,
        tags,
        productbatchSet: productbatchSet || []
      }
    );
  });
  return productsList;
};

export const getProducts = (data, status, isApproved) => {
  if (!data) {
    return [];
  }

  let products;
  switch (status) {
  case 'approved':
    products = getFilteredProducts(data.approvedProducts);
    break;

  case 'proposed':
    products = getFilteredProducts(data.proposedProducts);
    break;
  case 'proposed-edits':
    products = getFilteredProducts(data.proposedEdits);
    break;
  case 'all':
    products = getFilteredProducts(data.products);
    break;
  case 'search':
    const productsLists = filterProductsByStatus(data.products || [], isApproved);
    products = getFilteredProducts(productsLists);
    break;
  case undefined:
    products = [];
    break;

  default:
    products = getFilteredProducts(data.approvedProducts);
    break;
  }

  return products;
};

export const getSortedData = (data, order, orderBy) => stableSort(data, getSorting(order, orderBy));
