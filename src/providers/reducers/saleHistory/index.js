import saleHistoryActionTypes from './saleHistoryTypes';

const saleHistoryReducer = (saleHistory, action) => {
  switch (action.type) {
  case saleHistoryActionTypes.SET_SALE_HISTORY_STATE:
    return {
      ...saleHistory,
      ...action.payload
    };
  default:
    return saleHistory;
  }
};

export default saleHistoryReducer;
