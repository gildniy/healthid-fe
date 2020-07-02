import gql from 'graphql-tag';

export const GET_USER_OUTLETS = gql`
  query {
    me {
      id
      outlets {
        id
        name
        city {
          name
          country{
            name
          }
        }
      }
    }
  }
`;

const GET_USER_INFO = gql`
  query {
    me {
      id
      firstName
      lastName
      username
      mobileNumber
      secondaryPhoneNumber
      email
      secondaryEmail
      profileImage
      role {
        name
      }
      outlets {
        id
        name
        business {
          id
          logo
          legalName
          tradingName
          addressLine1
          addressLine2
          city
          country
          localGovernmentArea
          phoneNumber
          twitter
          businessEmail
          facebook
          website
          instagram
        }
        kind {
          name
        }
        city{
          name
          country{
            name
          }
        }
        outletRegister{
          id
          name
        }
        dateLaunched
        outletmetaSet {
          dataKey
          dataValue
        }
        receipttemplateSet {
          id
          cashier
          discountTotal
          receiptNo
          receipt
          subtotal
          totalTax
          amountToPay
          purchaseTotal
          changeDue
          loyalty
          loyaltyEarned
          loyaltyBalance
          barcode
        }
        users {
          id
          username
          email
          role {
            id
            name
          }
          jobTitle
        }
      }
      businessUser {
        id
        logo
        legalName
        tradingName
        addressLine1
        addressLine2
        city
        country
        localGovernmentArea
        phoneNumber
        twitter
        businessEmail
        facebook
        website
        instagram
        user {
          id
        }
      }
      birthday
      startingDate
      jobTitle
      activeOutlet {
        id
        name
        addressLine1
        addressLine2
        phoneNumber
        city {
          name
          country {
            name
          }
        }
        outletpreference {
          outletTimezone {
            name
          }
          paymentMethod
          outletCurrency{
            id
            symbol
          }
        }
      }
    }
  }
`;

export default GET_USER_INFO;
