import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const DELETE_REGISTER = gql`
mutation deleteRegister($id: Int!){
    deleteRegister(id: $id){
        success
        id
    }         
}
`;

export const DELETE_MULTIPLE_REGISTERS = gql`
mutation deleteRegister($ids: [Int]!){
    deleteRegisters(ids: $ids){
        success
    }
}
`;
