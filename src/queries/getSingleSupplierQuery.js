import gql from 'graphql-tag';

const GET_SINGLE_SUPPLIER = gql`
query($id: String){
  singleSupplier(id: $id){
    id
    name
    tier {
      id
      name
    }
    isApproved
    supplierContacts{
      email
      mobileNumber
      addressLine1
      addressLine2
      outlet {
        name
        id
      }
      city{
        name
        id
      }
      country{
        name
        id
      }
      lga
    }
    supplierratingSet{
      rating
    }
    supplierMeta{
      displayName
      creditDays
      logo
      paymentTerms
      commentary
    }
    suppliernoteSet{
      id
      createdAt
      note
      supplier {
        user {
          firstName
          lastName
        }
      }
    }
  }
}
`;

export default GET_SINGLE_SUPPLIER;
