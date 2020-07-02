import gql from 'graphql-tag';

const GET_PRODUCTS_SUPPLIERS_CATEGORIES = gql`
query ($businessId: String!){
  business(id: $businessId){
    suppliersSet{
      id
      name
      suppliersmetaSet{
        displayName
      }
    }
  }
  approvedSuppliers{
  id,
  name
  }
  productCategories(
    businessId: $businessId,
    ){
    id
    name
    loyaltyWeight
    isVatApplicable
    markup
  }
  dispensingSize{
    id,
    name
  }
  products{
  id,
  productName,
  isApproved
  }
}
`;

export const GET_SUPPLIERS_CATEGORIES = gql`
  query ($businessId: String!){
    productCategories(
      businessId: $businessId,
    ){
      id
      name
      loyaltyWeight
      isVatApplicable
    }
    dispensingSize{
      id,
      name
    }
  }
`;

export default GET_PRODUCTS_SUPPLIERS_CATEGORIES;
