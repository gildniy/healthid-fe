import gql from 'graphql-tag';

export const GET_OPEN_ORDERS = gql`
query($status: String!, $pageCount: Int, $pageNumber: Int) {
  totalOrdersPagesCount
  supplierOrdersSortedByStatus(
    status: $status, pageCount: $pageCount, pageNumber: $pageNumber
  ) {
    id
    createdAt
    updatedAt
    supplierOrderName
    supplierOrderNumber
    status
    numberOfProducts
    grandTotal
    orderDetails{
      order {
        business {
          id
          legalName
          tradingName
        }
      }
      supplier{
        id
        name
        suppliersmetaSet{
          displayName
        }
        batchinfoSet{
          batchQuantities{
            quantityReceived
          }
          quantity
        }
      }
      product{
        preOrderedQuantity
      }
    }
  }
}
`;

export default GET_OPEN_ORDERS;
