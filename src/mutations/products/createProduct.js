import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $productCategoryId: Int!,
    $productName: String!,
    $globalUpc: String,
    $dispensingSizeId: Int!,
    $description: String!,
    $brand: String!,
    $manufacturer: String!,
    $vatStatus: Boolean!,
    $preferredSupplierId: String,
    $backupSupplierId: String!,
    $loyaltyWeight: Int!,
    $tags: [String],
    $image: String,
    $reorderMax: Int,
    $reorderPoint: Int
    ) {
      createProduct(
        productCategoryId: $productCategoryId,
        productName: $productName,
        globalUpc: $globalUpc,
        dispensingSizeId: $dispensingSizeId,
        description: $description,
        brand: $brand,
        manufacturer: $manufacturer,
        vatStatus: $vatStatus,
        preferredSupplierId: $preferredSupplierId,
        backupSupplierId: $backupSupplierId,
        loyaltyWeight: $loyaltyWeight,
        tags: $tags,
        image: $image,
        reorderMax: $reorderMax,
        reorderPoint: $reorderPoint 
    ){
      product{
        ...ProductParts
      }
    }
  }
  ${ProductFragment}
`;

export default CREATE_PRODUCT;
