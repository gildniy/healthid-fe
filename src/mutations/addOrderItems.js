import gql from 'graphql-tag';

const ADD_ORDER_ITEMS = gql`
mutation addOrderItems($orderID: Int!, $productIDs: [Int]!){
    addOrderItems(orderId: $orderID, productId: $productIDs){
      message,
      addedProductDetails{
        id
        product{
          id
          skuNumber
          productName
          quantityInStock
        }
        quantity
        supplier {
          id
          name
        }
        preferredSupplier{
          id
          name
        }
        backupSupplier{
          id
          name
        }
        unitCost
      }
      duplicates{
        product{
          productName
        }
      }
    }
  }
`;

export default ADD_ORDER_ITEMS;
