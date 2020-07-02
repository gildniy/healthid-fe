import gql from 'graphql-tag';

export const CREATE_PRODUCT_CATEGORY = gql`
mutation createProductCategory(
  $businessId: String!
  $isVat: Boolean!
  $markup: Int!
  $name: String!
  $loyaltyWeight: Int!
){
  createProductCategory (
    businessId: $businessId
    isVatApplicable: $isVat
    markup: $markup
    name: $name
    loyaltyWeight: $loyaltyWeight
  ) {
    message
    productCategory {
      id
      name
      markup
      isVatApplicable
      loyaltyWeight
    }
  }
}
`;

export default CREATE_PRODUCT_CATEGORY;
