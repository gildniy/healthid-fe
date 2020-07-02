import gql from 'graphql-tag';

const CREATE_REGISTER = gql`
    mutation createRegister (
        $name: String!
        $number: Int!
        $outletId: Int!
    ) {
        createRegister (
            name: $name
            number: $number
            outletId: $outletId
        ) {
            registers {
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
                }
            }
        }
    }
`;

export default CREATE_REGISTER;
