import gql from 'graphql-tag';

const DELETE_ORDER_ITEMS = gql`
mutation deleteProductBatch($ids: [String]!){
  deleteProductBatch(ids: $ids){
    message
  }
}
`;

export default DELETE_ORDER_ITEMS;
