import gql from 'graphql-tag';

const GENERATE_ORDER = gql`
  mutation GenerateOrder(
    $orderID: Int!
  ) {
    generateOrder(
      orderId: $orderID
    ) {
        message
      }
    }
`;

export default GENERATE_ORDER;
