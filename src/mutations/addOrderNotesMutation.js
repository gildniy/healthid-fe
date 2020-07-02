import gql from 'graphql-tag';

const ADD_ORDER_NOTES = gql` 
  mutation addOrderNotes(
    $additionalNotes: String!,
    $supplierOrderId: String!
  ){
    addOrderNotes(
      additionalNotes: $additionalNotes,
      supplierOrderId: $supplierOrderId
    ){
      message   
    }
  }
`;

export default ADD_ORDER_NOTES;
