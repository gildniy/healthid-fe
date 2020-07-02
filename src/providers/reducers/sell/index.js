import SellActionTypes from './sellTypes';
import {
  addItemNote, addToCart, batchInputChange, holdSale,
  removeFromCart, returnCartBatches, toggleBatchesForCart,
} from './sellUtils';

const sellReducer = (sell, action) => {
  switch (action.type) {
  case SellActionTypes.SET_SELL_STATE:
    return {
      ...sell,
      ...action.payload
    };
  case SellActionTypes.SET_PREFERRED_PRODUCTS:
    return {
      ...sell,
      preferredProducts: [...action.payload]
    };
  case SellActionTypes.SET_SELECTED_PRODUCT:
    return {
      ...sell,
      selectedProduct: action.payload,
    };
  case SellActionTypes.TOGGLE_SALE_BATCH_DIALOG:
    return {
      ...sell,
      openSalesBatchDialog: !sell.openSalesBatchDialog,
      ...returnCartBatches(sell),
    };
  case SellActionTypes.TOGGLE_BATCHES_FOR_CART:
    return {
      ...sell,
      batchesForCart: toggleBatchesForCart(sell, action.payload),
    };
  case SellActionTypes.BATCH_INPUT_CHANGE:
    return {
      ...sell,
      batchesForCart: batchInputChange(sell, action.payload),
    };
  case SellActionTypes.ADD_TO_CART:
    return {
      ...sell,
      ...addToCart(sell),
      openOutOfStockPopper: false,
      openSalesBatchDialog: false,
      batchesForCart: [],
    };
  case SellActionTypes.REMOVE_FROM_CART:
    return {
      ...sell,
      cart: removeFromCart(sell, action.payload),
    };
  case SellActionTypes.ADD_ITEM_NOTE:
    return {
      ...sell,
      cart: addItemNote(sell, action.payload),
    };
  case SellActionTypes.HOLD_SALE:
    return {
      ...sell,
      salesOnHold: holdSale(sell, action.payload),
      cart: []
    };

  case SellActionTypes.TOGGLE_SELL_FROM_OUT_OF_STOCK:
    if (action.payload.closePopper) {
      return {
        ...sell,
        outOfStockEl: {},
        openOutOfStockPopper: false,
        batchesForCart: action.payload.batchesForCart,
      };
    }

    return {
      ...sell,
      outOfStockEl: action.payload.outOfStockEl,
      openOutOfStockPopper: action.payload.openOutOfStockPopper,
      outOfStockPopperParams: action.payload.outOfStockPopperParams,
      batchesForCart: action.payload.outOfStockPopperParams.batchesForCart
    };
  default:
    return sell;
  }
};

export default sellReducer;
