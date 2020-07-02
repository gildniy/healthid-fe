import gql from 'graphql-tag';

export const UPDATE_RECEIPT_TEMPLATE = gql`
mutation updateReceiptTemplate($id: String!, $cashier: Boolean,$discountTotal: Boolean,$receiptNo: Boolean,$receipt: Boolean,$subtotal: Boolean,$totalTax: Boolean,$amountToPay: Boolean,$purchaseTotal: Boolean,$changeDue: Boolean,$loyalty: Boolean,$loyaltyEarned: Boolean,$loyaltyBalance: Boolean,$barcode: Boolean ){
    updateReceiptTemplate(id: $id, cashier: $cashier,discountTotal: $discountTotal,receiptNo: $receiptNo,receipt: $receipt,subtotal: $subtotal,
        totalTax: $totalTax,amountToPay: $amountToPay,purchaseTotal: $purchaseTotal,changeDue: $changeDue,loyalty: $loyalty,loyaltyEarned: 
        $loyaltyEarned,loyaltyBalance: $loyaltyBalance,barcode: $barcode){
      receiptTemplate {
        id
          cashier
          discountTotal
          receiptNo
          receipt
          subtotal
          totalTax
          amountToPay
          purchaseTotal
          changeDue
          loyalty
          loyaltyEarned
          loyaltyBalance
          barcode
      }
    }
   }
`;

export const CREATE_RECEIPT_TEMPLATE = gql`
mutation createReceiptTemplate($outletId: Int!, $cashier: Boolean,$discountTotal: Boolean,$receiptNo: Boolean,$receipt: Boolean,$subtotal: Boolean,$totalTax: Boolean,$amountToPay: Boolean,$purchaseTotal: Boolean,$changeDue: Boolean,$loyalty: Boolean,$loyaltyEarned: Boolean,$loyaltyBalance: Boolean,$barcode: Boolean ){
    createReceiptTemplate(outletId: $outletId, cashier: $cashier,discountTotal: $discountTotal,receiptNo: $receiptNo,receipt: $receipt,subtotal: $subtotal,
        totalTax: $totalTax,amountToPay: $amountToPay,purchaseTotal: $purchaseTotal,changeDue: $changeDue,loyalty: $loyalty,loyaltyEarned: 
        $loyaltyEarned,loyaltyBalance: $loyaltyBalance,barcode: $barcode){
      receiptTemplate {
        id
          cashier
          discountTotal
          receiptNo
          receipt
          subtotal
          totalTax
          amountToPay
          purchaseTotal
          changeDue
          loyalty
          loyaltyEarned
          loyaltyBalance
          barcode
      }
    }
   }
`;
