import gql from 'graphql-tag';

const GET_SALES_HISTORY = gql`
  query(
    $id: Int!,
    $search: String,
    $dateFrom: DateTime,
    $dateTo: DateTime, 
    $pageNumber: Int, 
    $pageCount: Int,
  ) {
    outletSalesHistory (
      outletId: $id, 
      search: $search,
      dateFrom: $dateFrom,
      dateTo: $dateTo, 
      pageNumber: $pageNumber, 
      pageCount: $pageCount
    ) {
      id
      createdAt
      salesPerson{
        id
        firstName
        lastName
      }
      receipt{
        id
        receiptNo
      }
      amountToPay
      paymentMethod
      customer{
        id
        firstName
        lastName
      }
      outlet{
        id
        name
        city{
          id
          name
        }
      }
      saledetailSet{
        id
        product{
          id
          productName
        }
        quantity
        price
      }
      splitPayments{
        paymentMethod
        amount
      }
    }
    totalNumberOfSales
  }
`;

export const GET_SALE_HISTORY = gql`
query($saleId: Int!){
  saleHistory(saleId: $saleId){
      id
      createdAt
      salesPerson{
        id
        firstName
        lastName
        role{
          id
          name
        }
      }
      receipt{
        id
        barcode
        receiptNo
        purchaseTotal
        amountToPay
        subTotal
        discountTotal
        changeDue
        cashier{
          id
          firstName
          lastName
          username
        }
      }
      amountToPay
      customer{
        id
        firstName
        lastName
      }
      outlet{
        id
        name
        phoneNumber
        outletcontactsSet{
          id
          dataKey
          dataValue
        }
        business{
          id
          addressLine1
          phoneNumber
        }
        city{
          id
          name
          country{
            id
            name
          }
        }
        outletpreference{
          id
          outletCurrency{
            id
            symbol
          }
        }
      }
    saledetailSet{
      id
      product{
        id
        productName
        quantityInStock
        dispensingSize{
          id
          name
        }
      }
      batch {
        id
        expiryDate
        batchRef
      }
      quantity
      discount
      price
      note
    }
    amountToPay
    discountTotal
    subTotal
    paidAmount
    changeDue
    paymentMethod
    notes
  }
}
`;
export default GET_SALES_HISTORY;
