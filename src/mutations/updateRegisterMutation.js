import gql from 'graphql-tag'

const UPDATE_REGISTER = gql`
    mutation updateRegister (
        $registerIdInt: Int!
        $registerName: String!
    ) {
        updateRegister(
            id: $registerIdInt
            name: $registerName
        ) {
            register {
                outlet {
                    id
                    name
                    city {
                        name
                        country {
                            name
                        }
                    }
                    taxNumber
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
            message
        }
    }
`;

export default UPDATE_REGISTER;
