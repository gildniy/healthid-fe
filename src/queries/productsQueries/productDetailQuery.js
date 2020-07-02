import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const PRODUCT_DETAIL_QUERY = gql`
  query($id: Int) {
    product(id: $id) {
      ...ProductParts
      business {
        id
        outletSet {
          id
          outletpreference {
            id
            outletCurrency {
              id
              symbol
            }
          }
        }
      }
    }
  }
  ${ProductFragment}
`;

export default PRODUCT_DETAIL_QUERY;
