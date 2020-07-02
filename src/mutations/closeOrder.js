import gql from 'graphql-tag';

const CLOSE_ORDER = gql`
mutation closeOrder(
  $supplierOrderId: String!
  ){
    closeOrder(
      supplierOrderId: $supplierOrderId
    ){
      message
    }
  }
`;

export default CLOSE_ORDER;
