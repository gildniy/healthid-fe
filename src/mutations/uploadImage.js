import gql from 'graphql-tag';

export const UPLOAD_IMAGE = gql`
mutation uploadInvoice(
$invoiceFile: String!,
$supplierOrderId: String!,
){
  uploadInvoice(invoiceFile:$invoiceFile, supplierOrderId:$supplierOrderId){
    invoice{ id }
    message
  }
}
`;

export default UPLOAD_IMAGE;
