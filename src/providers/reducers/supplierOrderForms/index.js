import orderFormsActionTypes from './orderFormsTypes';

const orderFormsReducer = (orderForms, action) => {
  switch (action.type) {
  case orderFormsActionTypes.SET_DATA:
    return {
      ...orderForms,
      ...action.payload,
    };
  default:
    return orderForms;
  }
};

export default orderFormsReducer;
