import gql from 'graphql-tag';

const GET_MANUAL_ADDED_PRODUCTS = gql`
query($id: Int!){
    orderProducts(orderId: $id) {
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

export default GET_MANUAL_ADDED_PRODUCTS;
