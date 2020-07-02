import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

const CREATE_SALE_MUTATION = gql`
  mutation createSale(
    $amountToPay: Float!,
    $changeDue: Float!,
    $customerId: String,
    $discountTotal: Float!,
    $notes: String,
    $outletId: Int!,
    $paidAmount: Float!,
    $paymentMethod: String!,
    $subTotal: Float!
    $batches: [Batches]!,
    $paymentsMade: [PaymentDetails]!
  ) {
    createSale(
      amountToPay: $amountToPay,
      changeDue: $changeDue,
      customerId: $customerId,
      discountTotal: $discountTotal,
      notes: $notes,
      outletId: $outletId,
      paidAmount: $paidAmount,
      paymentMethod: $paymentMethod,
      subTotal: $subTotal,
      batches: $batches,
      paymentsMade: $paymentsMade
    ){
      sale {
        id
        amountToPay
        discountTotal
        paidAmount
        changeDue
        paymentMethod
        customer {
          firstName
          lastName
          email
        }
        salesPerson {
          username
        }
        outlet {
          outletRegister {
            id
          }
          outletcontactsSet{
            dataKey
            dataValue
          }
          business {
            id
            tradingName
            legalName
            country
            city
            phoneNumber
            addressLine1
            addressLine2
          }
        }
      }
      message
      receipt {
        receiptNo
        footer
      }
      products {
        ...ProductParts
      }
    }
  }
  ${ProductFragment}
`;

export default CREATE_SALE_MUTATION;
