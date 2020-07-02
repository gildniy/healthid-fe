import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const UPDATE_BATCH_INFO = gql`
 mutation updateBatchInfo(
  $batchId: String!,
  $batchNo: String!,
  $expiryDate: String!,
  $quantity: Int!,
  $supplierId: String!,
  $costPerItem: Float!,
  $dateReceived: String!,
) {
    updateBatchInfo(
      batchId: $batchId
      batchNo: $batchNo
      expiryDate: $expiryDate
      dateReceived: $dateReceived
      quantityRemaining: $quantity 
      supplierId: $supplierId
      unitCost: $costPerItem
    ){
      message
      batchInfo {
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

export default UPDATE_BATCH_INFO;
