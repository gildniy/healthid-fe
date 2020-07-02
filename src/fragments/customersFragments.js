import gql from 'graphql-tag';

export const CustomerFragment = gql`
  fragment CustomerParts on CustomerCustomerType {
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
`;

export default CustomerFragment;
