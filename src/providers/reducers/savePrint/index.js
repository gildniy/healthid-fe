import SavePrintTypes from './savePrintTypes';

const savePrintReducer = (savePrint, action) => {
  switch (action.type) {
  case SavePrintTypes.TOGGLE_POPPER_OPEN:
    return {
      ...savePrint,
      popperOpen: !savePrint.popperOpen,
      anchorEl: action.payload
    };
  default:
    return savePrint;
  }
};

export default savePrintReducer;
