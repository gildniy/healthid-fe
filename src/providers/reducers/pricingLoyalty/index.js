import PricingActionTypes from './pricingTypes';
import { addSelectedRows } from './pricingUtils';

const pricingReducer = (pricing, action) => {
  switch (action.type) {
  case PricingActionTypes.SET_SELECTED:
    return {
      ...pricing,
      selected: action.payload,
      selectedRows: addSelectedRows(pricing, action.payload)
    };
  case PricingActionTypes.SET_DATA:
    return {
      ...pricing,
      rows: action.payload,
    };
  default:
    return pricing;
  }
};

export default pricingReducer;
