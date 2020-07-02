import gql from 'graphql-tag';

const GET_AUTO_FILLED_PRODUCTS_AND_SUPPLIERS = gql`
query($id: Int!){
    productsOrder(orderId: $id) {
        id
        product{
            id
            productName
            quantityInStock
          },
        skuNumber
        productQuantity
        currentSupplier{
            id
            name
            }
        preferredSupplier{
            id
            name
        }
        backupSupplier{
            id
            name
        }
        productUnitPrice
    }
}
`;

export default GET_AUTO_FILLED_PRODUCTS_AND_SUPPLIERS;
