import gql from 'graphql-tag';

const GET_PRODUCT_CATEGORIES = gql`
query productCategories(
    $businessId: String!
    ){
  productCategories(
    businessId: $businessId,
    ){
    id
    name
    loyaltyWeight
    isVatApplicable
    markup
  }
}
`;

export default GET_PRODUCT_CATEGORIES;
