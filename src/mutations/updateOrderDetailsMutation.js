import gql from 'graphql-tag';

const UPDATE_ORDER_DETAILS = gql`
mutation editInitiatedOrder(
  $orderId: Int!,
  $outletId: Int!,
  $orderName: String!,
  $orderDue: Date!
){
  editInitiatedOrder(
    orderId: $orderId,
    name: $orderName,
    deliveryDate: $orderDue,
    destinationOutletId: $outletId
  ){
    order{
      id
      name
      deliveryDate
      orderNumber
      destinationOutlet {
        id, name
      }
    }
    success
    error
  }
}
`;

export default UPDATE_ORDER_DETAILS;
