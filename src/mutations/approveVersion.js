import gql from 'graphql-tag';

export default gql`
  mutation approveEditRequest(
    $id: String!
  ) {
    approveEditRequest(id: $id) {
        message
    } 
  }
`;
