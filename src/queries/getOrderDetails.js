import gql from 'graphql-tag';

const GET_ORDER_DETAILS = gql`
  query($id: Int!){
    order(orderId: $id) {
      id
      name
      orderNumber
      deliveryDate
      destinationOutlet{
          name,
          id
      }
      productAutofill
      supplierAutofill
      orderItems {
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
    }
  }
`;

export default GET_ORDER_DETAILS;
