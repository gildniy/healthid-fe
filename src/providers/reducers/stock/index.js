import StockActionTypes from './stockTypes';
import { addQuantities } from './stockUtils';

const stockReducer = (stock, action) => {
  switch (action.type) {
  case StockActionTypes.CHANGE_QUANTITY:
    return {
      ...stock,
      batchQuantities: addQuantities(stock.batchQuantities, action.payload)
    };
  case StockActionTypes.TOGGLE_DIALOG:
    return {
      ...stock,
      openDialog: !stock.openDialog,
      batchQuantities: []
    };
  case StockActionTypes.TOGGLE_LOADING:
    return {
      ...stock,
      isLoading: !stock.isLoading
    };
  default:
    return stock;
  }
};

export default stockReducer;
