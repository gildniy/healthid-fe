import gql from 'graphql-tag';

const EDIT_SUPPLIER = gql`
  mutation editSupplier(
    $id: String!
    $name: String!
    $email: String!
    $mobileNumber: String!
    $addressLine1: String!
    $addressLine2: String
    $lga: String
    $cityId: Int!
    $tierId: Int!
    $countryId: Int!
    $creditDays: Int
    $logo: String
    $commentary: String
    $paymentTerms: String!
    $outletId: Int!
  ) {
    editSupplier(
      id: $id,
      tierId: $tierId
      contacts:{
        email: $email
        mobileNumber: $mobileNumber
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        lga: $lga
        cityId: $cityId
        countryId: $countryId
        outletId: $outletId
      },
      meta:{
        displayName: $name
        creditDays: $creditDays
        logo: $logo
        paymentTerms: $paymentTerms
        commentary: $commentary
      }
    ) {
      message
    }
  }
`;

export default EDIT_SUPPLIER;
