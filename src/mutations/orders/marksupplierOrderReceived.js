import gql from 'graphql-tag';

const MARK_SUPPLIER_ORDER_RECEIVED = gql`
mutation markSupplierOrderAsRecieved(
  $additionalNotes: String, $deliveryPromptness: Boolean,
  $serviceQuality: Int, $supplierOrderId: String!
){
  markSupplierOrderAsRecieved(
    additionalNotes: $additionalNotes, deliveryPromptness: $deliveryPromptness,
    serviceQuality: $serviceQuality, supplierOrderId: $supplierOrderId
  ){
    message
    supplierOrder {
      id
      status
    }
  }
}
`;

export default MARK_SUPPLIER_ORDER_RECEIVED;
