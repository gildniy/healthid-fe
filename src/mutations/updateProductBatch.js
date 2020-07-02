import gql from 'graphql-tag';
import { ProductFragment } from '../fragments/productsFragments';

const UPDATE_PRODUCT_BATCH = gql`
  mutation updateProductBatch(
    $orderId: Int, $supplierId: String, $ids: [String]!, $batchRef: String,
    $dateReceived: String, $expiryDate: String, $unitCost: Int, $quantity: Int,
    $status: String
  ){
    updateProductBatch(
      orderId: $orderId, supplierId: $supplierId, ids: $ids, batchRef: $batchRef,
      dateReceived: $dateReceived, expiryDate: $expiryDate, unitCost: $unitCost,
      quantity: $quantity, status: $status
    ){
      message
      productBatchesUpdated{
        id
        quantity
        unitCost
        status
        order {
          id
          name
          orderNumber
          sentStatus
          status
          createdAt
          paymentDue
          user {
            firstName
            lastName
          }
          destinationOutlet {
            id
            name
            addressLine1
            city {
              id
              name
              country {
                id
                name
              }
            }
          }
          deliveryDate
        }
        product {
          ...ProductParts
        }
        supplier {
          id
          name
          suppliersmetaSet{
            id
            creditDays
            paymentTerms
          }
        }
        preferredSupplier{
          id
          name
        }
        backupSupplier{
          id
          name
        }
      }
    }
  }
  ${ProductFragment}
`;

export default UPDATE_PRODUCT_BATCH;
