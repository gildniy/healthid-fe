import gql from 'graphql-tag';

export const GET_SALES_PERFORMANCES = gql`
  query(
    $outlets: [Int],
    $dateFrom: DateTime,
    $dateTo: DateTime,
  ) {
    salePerformances(
      outlets: $outlets
      transactionDate_Gt: $dateFrom
      transactionDate_Lt: $dateTo
    ) {
      edges {
        node {
          id
          transactionDate
          subtotal
          quantitySold
          product {
            id
            productName
            image
            quantityInStock
          }
        }
      }
    }
  }
`;

export default GET_SALES_PERFORMANCES;
