import gql from 'graphql-tag';

export const GET_SINGLE_BUSINESS = gql`
    query($id: String) {
        business(id : $id) {
            id
            legalName
            tradingName
            addressLine1
            addressLine2
            phoneNumber
            businessEmail
            instagram
            twitter
            facebook
            website
            outletSet {
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
        }
    }
`;

export const GET_BUSINESSES = gql`
    query {
        businesses {
            id
            tradingName
            legalName
            phoneNumber
            website
            twitter
        }
    }
`;
