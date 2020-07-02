import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const CREATE_BATCH_INFO = gql`
 mutation createBatchInfo(
  $dateReceived: String!,
  $expiryDate: String!,
  $productId: Int!,
  $quantityReceived: Int!,
  $supplierId: String!,
  $costPerItem: Float!,
  $batchRef: String
) {
    createBatchInfo(
      dateReceived: $dateReceived
      expiryDate: $expiryDate
      productId: $productId 
      quantity: $quantityReceived 
      supplierId: $supplierId
      unitCost: $costPerItem
      batchRef: $batchRef
    ){
      message
      productBatch {
        product {
          ...ProductParts
          business {
            id
            outletSet {
              id
              outletpreference {
                outletCurrency {
                  symbol
                }
              }
            }
          }
        }
      }
    }
  } 
  ${ProductFragment}
`;

export default CREATE_BATCH_INFO;
