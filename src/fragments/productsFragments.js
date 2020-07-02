import gql from 'graphql-tag';

export const ProductFragment = gql`
  fragment ProductParts on ProductType {
    id
    globalUpc
    isApproved
    productName
    image
    skuNumber
    description
    brand
    manufacturer
    vatStatus
    salesPrice
    createdAt
    markup
    autoPrice
    nearestExpiryDate
    loyaltyWeight
    tags
    reorderPoint
    reorderMax
    unitCost
    quantityInStock
    productbatchSet{
      id  
      batchRef
      unitCost
      dateReceived
      quantity
      expiryDate
      status
      supplier{
        id
        name
      }
    }
    productCategory {
      id
      name
    }
    quantityInStock
    dispensingSize {
      id
      name
    }
    preferredSupplier {
      id
      name
      suppliersmetaSet {
        id
        displayName
      }
    }
    backupSupplier {
      id
      name
      suppliersmetaSet {
        id
        displayName
      }
    }
  }
`;

export default ProductFragment;
