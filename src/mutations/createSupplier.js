import gql from 'graphql-tag';

const CREATE_SUPPLIER = gql`
  mutation addSupplier(
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
    addSupplier(
      input: {
        name: $name,
        tierId: $tierId
      },
      contactsInput:{
        email: $email
        mobileNumber: $mobileNumber
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        lga: $lga
        cityId: $cityId
        countryId: $countryId
        outletId: $outletId
      },
      metaInput:{
        creditDays: $creditDays
        logo: $logo
        paymentTerms: $paymentTerms
        commentary: $commentary
      }
    ) {
      supplier {
        id
        name
        supplierContacts{
          email
          country { name }
          city { name }
          addressLine1
          addressLine2
          mobileNumber
        }
        supplierMeta{
          id
          displayName
          creditDays
          paymentTerms
          commentary
          adminComment
        }
      } 
    }
  }
`;

export default CREATE_SUPPLIER;
