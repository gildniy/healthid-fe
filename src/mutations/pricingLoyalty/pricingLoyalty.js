import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

export const EDIT_LOYALTY = gql`
  mutation productLoyaltyWeightUpdate(
    $id: [String]!
    $loyaltyValue: Int!
  ) {
    productLoyaltyWeightUpdate(
      id: $id,
      loyaltyValue: $loyaltyValue,
    ) {
      message
      product{
        ...ProductParts
      }
    }
  }
  ${ProductFragment}
`;

export const EDIT_PRICING = gql`
  mutation updatePrice(
    $productIds: [Int]
    $markup: Int
    $salesPrice: Float
  ) {
    updatePrice(
      productIds: $productIds,
      markup: $markup,
      salesPrice: $salesPrice,
    ) {
      message
      products{
        ...ProductParts
      }
    }
  }
  ${ProductFragment}
`;
