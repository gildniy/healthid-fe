import gql from 'graphql-tag';

export const CUSTOMERS = gql`
  query {
    customers(offline: true) {
      id
      firstName
      lastName
      email
      primaryMobileNumber
      secondaryMobileNumber
      addressLine1
      localGovernmentArea
      city{
        id
        name
      }
      country{
        id
        name
      }
      emergencyContactName
      emergencyContactNumber
      emergencyContactEmail
      loyaltyMember
      loyaltyPoints
      wallet{
        storeCredit
      }
      saleSet{
        createdAt
      }
    }
    totalCustomersCount
  }
`;

export const GET_FILTERED_CUSTOMERS = gql`
  query ($firstName: String ) {
    filterCustomers(
      firstName_Icontains: $firstName
    ){
      edges{
        node{
          id
          firstName
          lastName
          email
          primaryMobileNumber
          secondaryMobileNumber
          addressLine1
          localGovernmentArea
          city{
            id
            name
          }
          country{
            id
            name
          }
          emergencyContactName
          emergencyContactNumber
          emergencyContactEmail
          loyaltyMember
          loyaltyPoints
          wallet{
            storeCredit
          }
          saleSet{
            createdAt
          }
        }
      }
    }
    totalCustomersCount
  }
`;
