import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

export const GET_INITIAL_PRODUCTS = gql`
  query {
    approvedProducts(pageCount:10000, pageNumber: 1 ) {
      ...ProductParts
    }
  }
  ${ProductFragment}
`;

export default GET_INITIAL_PRODUCTS;
