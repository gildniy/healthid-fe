import gql from 'graphql-tag';

const GET_SUPPLIER_ORDER_FORMS = gql`
  query {
    allSuppliersOrderForms {
      order{
        id
      }
      supplier{
        id
      }
      id
      orderDetails{
        id,
        status,
        supplier {
          id
          name
        }
        order {
          name
          orderNumber
          sentStatus
        }
      }
    }
  }
`;

export default GET_SUPPLIER_ORDER_FORMS;
