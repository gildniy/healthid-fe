import gql from 'graphql-tag'

const UPDATE_OUTLET = gql`
    mutation(
        $addressLine1: String,
        $addressLine2: String,
        $cityName: String,
        $country: String,
        $dateLaunched: Date,
        $id: Int!,
        $kindId: Int,
        $lga: String,
        $name: String,
        $phoneNumber: String,
        $preferenceId: String,
        $prefixId: String,
        $taxNumber: String
    ) {
        updateOutlet(
            addressLine1: $addressLine1,
            addressLine2: $addressLine2,
            cityName: $cityName,
            country: $country,
            dateLaunched: $dateLaunched,
            id: $id,
            kindId: $kindId,
            lga: $lga,
            name: $name,
            phoneNumber: $phoneNumber,
            preferenceId: $preferenceId,
            prefixId: $prefixId,
            taxNumber: $taxNumber,
        ){
            outlet {
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
                    name
                    id
#                    receipt {
#                        id
#                    }
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
            success
        }
    }
`;

export default UPDATE_OUTLET;
