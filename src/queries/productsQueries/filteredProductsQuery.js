import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const GET_FILTERED_PRODUCTS = gql`
  query ($isApproved: Boolean, $productName: String ) {
    filterProducts(
      isApproved: $isApproved
      productName_Icontains: $productName
    ){
      edges{
        node{
          ...ProductParts
        }
      }
    }
  }
  ${ProductFragment}
`;

export default GET_FILTERED_PRODUCTS;
