import gql from 'graphql-tag';

export const INITIATE_ORDER = gql`
  mutation initiateOrder(
    $business: String!
    $deliveryDate: Date!,
    $destinationOutlet: Int!,
    $productAutofill: Boolean!,
    $supplierAutofill: Boolean!,
  ){
    initiateOrder(
      business: $business
      deliveryDate: $deliveryDate,
      destinationOutlet: $destinationOutlet,
      productAutofill: $productAutofill,
      supplierAutofill: $supplierAutofill,
    ){
      order {
        id,
        productAutofill
        supplierAutofill
      }
      success
      error
    }
  }
`;

export default INITIATE_ORDER;
