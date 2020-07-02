import gql from 'graphql-tag';

export const GET_ALL_SUPPLIERS = (pageCount, pageNumber, value) => gql`
query{
  allSuppliers(pageCount: ${pageCount}, pageNumber: ${pageNumber}, isApproved: ${value}){
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
      country{
        name
      }
      city{
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
  }
  totalSuppliersPagesCount
}
`;
export const FILTER_SUPPLIERS = (type, value, pageCount, pageNumber) => {
  switch (type) {
  case 'status': {
    return gql`
      query {
        filterSuppliers(
          isApproved: ${value}, pageCount: ${pageCount}, pageNumber: ${pageNumber}
        ) {
          edges {
            node {
              id
              name
              isApproved
              user{
                id
              }
              supplierContacts{
                email
                mobileNumber
                addressLine1
                addressLine2
                country{
                  name
                }
                city{
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
              suppliernoteSet {
                note
              }
              tier {
                name
              }
            }
          }
        }
        totalNumberOfSuppliers
      }
    `;
  }
  case 'search': {
    return gql`
   query {
     filterSuppliers(name_Icontains: "${value}") {
       edges {
         node {
          id
          name
          isApproved
          user{
            id
          }
          supplierContacts{
            email
            mobileNumber
            addressLine1
            addressLine2
            country{
              name
            }
            city{
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
          suppliernoteSet {
            note
          }
          tier {
            name
          }
         }
       }
     }
   }
 `;
  }
  default:
    return null;
  }
};

export const FILTER_APPROVED_SUPPLIERS = gql`
  query ($isApproved: Boolean, $supplier: String ) {
    filterSuppliers(
      isApproved: $isApproved
      name_Icontains: $supplier
    ){
    edges {
      node {
      id
      name
      isApproved
      user{
        id
      }
      supplierContacts{
        email
        mobileNumber
        addressLine1
        addressLine2
        country{
          name
        }
        city{
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
      suppliernoteSet {
        note
      }
      tier {
        name
      }
      }
    }
  }
}
`;
