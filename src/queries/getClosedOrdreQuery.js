import gql from 'graphql-tag';

const GET_ORDER_BY_ID = gql`
 query($orderID: Int!){
  order(orderId: $orderID) {
    id
    orderNumber
    sentStatus
    createdAt
    user{
      firstName
      lastName
    }
    name
    closed
    orderdetailsSet {
      supplierOrderNumber
      product {
        id
        productName
        unitCost
      }
      orderedQuantity
      price
    }
    deliveryDate
    invoice {
      imageUrl
    }
    supplierorderdetailsSet {
      supplierOrderNumber
      supplierOrderName
      additionalNotes
      supplier {
        id
        name
        suppliersmetaSet {
          creditDays
          paymentTerms
        }
      }
      orderDetails {
        product {
          productName
          skuNumber
        }
        price
        costPerItem
        orderedQuantity
      }
      deliveryDue
      deliverTo
      createdAt
    }
  }
}
`;

export default GET_ORDER_BY_ID;
