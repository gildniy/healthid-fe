import gql from 'graphql-tag';

const PLACE_ORDER = gql`
  mutation placeOrder(
    $supplierOrderIds: [String]!
  ) {
    placeOrder(
      supplierOrderIds: $supplierOrderIds,
    ) {
      orderMessage
      mailMessage
    } 
  }
`;

export default PLACE_ORDER;
