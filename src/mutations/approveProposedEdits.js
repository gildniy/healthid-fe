import gql from 'graphql-tag';

const APPROVE_PROPOSED_EDITS = gql`
  mutation approveProposedEdits (
      $editRequestId: Int!,
      $productId: Int!
    ) {
        approveProposedEdits(
          editRequestId: $editRequestId,
          productId: $productId
        ){
          message
        }
      }
`;

export default APPROVE_PROPOSED_EDITS;
