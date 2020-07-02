import CustomerActionTypes from './customerTypes';

const customersReducer = (customers, action) => {
  switch (action.type) {
  case CustomerActionTypes.SET_CUSTOMER_VALUE:
    return {
      ...customers,
      ...action.payload
    };
  default:
    return customers;
  }
};

export default customersReducer;
