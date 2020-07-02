import gql from 'graphql-tag';

const GET_SUPPLIER_ORDER_FORM = gql`
  query($supplierOrderId: String!){
    supplierOrderForm(
      supplierOrderId: $supplierOrderId
    ){
      id
      status
      supplierOrderName
      supplierOrderNumber
      additionalNotes
      serviceQuality
      deliveryPromptness
      order{
        id
      }
      supplier{
        id
      }
      orderDetails {
        id
        quantity
        unitCost
        status
        batchRef
        dateReceived
        expiryDate
        order {
          id
          name
          orderNumber
          sentStatus
          status
          createdAt
          paymentDue
          user {
            firstName
            lastName
          }
          destinationOutlet {
            id
            name
            addressLine1
            city {
              id
              name
              country {
                id
                name
              }
            }
          }
          deliveryDate
        }
        product {
          id
          productName
          salesPrice
        }
        supplier {
          id
          name
          suppliersmetaSet{
            id
            creditDays
            paymentTerms
          }
        }
      }
    }
  }
`;

export default GET_SUPPLIER_ORDER_FORM;
