import gql from 'graphql-tag';

export const GET_OUTLETS = gql`
  query {
    outlets{
        name
        id
        users{
          id
          firstName
          lastName
          email
        }
        
      }
  }
`;

export const GET_SINGLE_OUTLET = gql`
    query($id: Int) {
        outlet(id: $id){
            id
            name
            taxNumber
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
                name
                id
                deletedAt
            }
            dateLaunched
            outletmetaSet {
                dataKey
                dataValue
            }
            outletcontactsSet{
                dataKey,
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
`;
