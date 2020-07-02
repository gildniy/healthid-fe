import gql from 'graphql-tag';

const CANCEL_ORDER = gql`
  mutation cancelOrder(
    $supplierOrderIds: [String]
  ) {
    cancelOrder(
      supplierOrderIds: $supplierOrderIds
    ) {
        message
      } 
    }
`;

export default CANCEL_ORDER;
