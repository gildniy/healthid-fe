import returnActionTypes from './returnsTypes';

import {
  aggregateBatches,
  removeFromCart,
  toggleSelectedBatch,
  setProductNote,
  toggleItemSellable,
  setReturnReason,
  changeReturnQuantity, discardReturn
} from './returnsUtils';

const returnsReducer = (returns, action) => {
  switch (action.type) {
  case returnActionTypes.TOGGLE_PROCESS_RETURN_DIALOG:
    return {
      ...returns,
      openProcessReturnDialog: !returns.openProcessReturnDialog,
    };
  case returnActionTypes.TOGGLE_SELECTED_BATCH:
    return {
      ...returns,
      ...toggleSelectedBatch(returns, action.payload)
    };
  case returnActionTypes.REMOVE_FROM_CART:
    return {
      ...returns,
      ...removeFromCart(returns, action.payload)
    };
  case returnActionTypes.SET_RETURN_STATE:
    return {
      ...returns,
      ...action.payload
    };
  case returnActionTypes.SET_PRODUCT_NOTE:
    return {
      ...returns,
      ...setProductNote(returns, action.payload)
    };
  case returnActionTypes.SET_RETURN_REASON:
    return {
      ...returns,
      ...setReturnReason(returns, action.payload)
    };
  case returnActionTypes.AGGREGATE_BATCHES:
    return {
      ...returns,
      openProcessReturnDialog: false,
      ...aggregateBatches(returns.toBeReturnedBatches)
    };
  case returnActionTypes.TOGGLE_ITEM_RESELLABBLE:
    return {
      ...returns,
      ...toggleItemSellable(returns, action.payload)
    };
  case returnActionTypes.SET_SALE_DETAIL_RETURN_QUANTITY:
    return {
      ...returns,
      ...changeReturnQuantity(returns, action.payload)
    };
  case returnActionTypes.DISCARD_RETURN:
    return {
      ...returns,
      ...discardReturn()
    };
  default:
    return returns;
  }
};

export default returnsReducer;
