import gql from 'graphql-tag';

export default gql`
  query($pageNumber: Int, $pageCount: Int, $supplierId: String) {
    singleSupplier(id: $supplierId) {
      id
      name
      user{
        id
      }
      supplierContacts{
        email
        mobileNumber
        addressLine1
        addressLine2
        outlet {
          id
        }
        country{
          name
        }
        city{
            name
            country{
              name
            }
        }
      }
      suppliersmetaSet{
        displayName
        logo
        paymentTerms
        creditDays
        commentary
      }
      isApproved
      tier {
        name
      }
      suppliernoteSet{
        note
      }
      supplierratingSet {
        rating
      }
    }
    editSuppliersRequests(pageNumber: $pageNumber, pageCount: $pageCount, supplierId: $supplierId){
      id
      version
      createdAt
      status
      isApproved
      proposedBy {
        firstName
        lastName
      }
      approvedBy {
        firstName
        lastName
      }
    }
    countries {
      id
      name
      citySet {
        id
        name
      }
    }
    totalNumberOfSuppliers
  }
`;
