import gql from 'graphql-tag';

const CREATE_OUTLET = gql`
    mutation(
        $addressLine1: String,
        $addressLine2: String,
        $businessId: String,
        $cityName: String,
        $country: String,
        $dateLaunched: Date,
        $kindId: Int,
        $lga: String,
        $outletName: String,
        $phoneNumber: String,
        $prefixId: String,
        $taxNumber: String
    ) {
        createOutlet(
            addressLine1: $addressLine1
            addressLine2: $addressLine2
            businessId: $businessId
            cityName: $cityName
            country: $country
            dateLaunched: $dateLaunched
            kindId: $kindId
            lga: $lga
            name: $outletName
            phoneNumber: $phoneNumber
            prefixId: $prefixId
            taxNumber: $taxNumber
        ){
            outlet {
                id
                name
                city {
                    name
                    country {
                        name
                    }
                }
                kind {
                    name
                }
                outletRegister {
                    id
                    name
                }
                addressLine1
                addressLine2
                lga
                phoneNumber
                dateLaunched
                taxNumber
            }
            success
        }
    }
`;

export default CREATE_OUTLET;
