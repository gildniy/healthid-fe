import gql from 'graphql-tag';

const GET_ORDER_DESCRIPTION_BY_ID = gql`
  query ($supplierOrderFormId: String!){
    supplierOrderDetails(supplierOrderFormId: $supplierOrderFormId) {
      id
      orderDetails {
        id
        product {
          id
          productName
          salesPrice
          batchInfo{
            batchQuantities {
              quantityReceived
            }
          }
        }
      }
      supplierOrderName
      supplierOrderNumber
    }
  }
`;

export default GET_ORDER_DESCRIPTION_BY_ID;
