import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: Int!,
    $productCategoryId: Int,
    $productName: String,
    $globalUpc: String,
    $dispensingSizeId: Int,
    $description: String,
    $brand: String,
    $manufacturer: String,
    $vatStatus: Boolean,
    $preferredSupplierId: String,
    $backupSupplierId: String,
    $loyaltyWeight: Int,
    $tags: [String],
    $image: String,
    $reorderPoint: Int,
    $reorderMax: Int
    ) {
      updateProduct(
        id: $id,
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
        reorderPoint: $reorderPoint,
        reorderMax: $reorderMax
    ){
      product{
        ...ProductParts
      }
    }
  }
  ${ProductFragment}
`;

export default UPDATE_PRODUCT;
