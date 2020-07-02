import red from '@material-ui/core/colors/red';

export const addedItems = {
  root: {
    marginLeft: '80px',
    marginRight: '80px',
    backgroundColor: '#424242',
  },
  container: {
    margin: '20px'
  },
  cartWrapper: {
    height: '600px',
    paddingRight: '2em',
    paddingLeft: '2em',
    right: '0',
  },
  productsWrapper: {
    paddingLeft: '2em'
  },
  paper: {
    width: '100%',
    backgroundColor: '#424242',
  },
  tablePaper: {
    width: '100%',
    backgroundColor: '#424242',
    height: '13em',
    minHeight: '13em',
    overflow: 'auto',
  },
  buttons: {
    textTransform: 'capitalize',
    color: '#424242',
    padding: '0 1.5rem'
  },
  buttonsGrid: {
    padding: '0.3rem 0',
    justifyContent: 'space-between'
  },
  buttonsIcons: {
    padding: '4px',
    cursor: 'pointer',
    color: '#424242',
    marginRight: '3px',
  },
  buttonsTypo: {
    fontWeight: 'bold',
  },
  box: {
    borderColor: '#d8d8d8',
    padding: '1px',
    width: '100%',
  },
  inputRoot: {
    backgroundColor: '#666666',
    color: 'white',
    width: '100%',
    padding: '5px 8px',
    border: 8,
    borderColor: '#424242'
  },
  inputInput: {
    paddingTop: 10,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 1,
    width: '100%',
  },
  adornment: {
    color: '#999999',
    fontSize: '1em',
    marginBottom: '4px'
  },
  singleCustomerList: {
    paddingTop: 0,
    paddingBottom: '2px',
  },
  listItemText: {
    paddingLeft: '5px',
  },
  listItemTrashIcon: {
    marginRight: '15px',
    fontSize: '16px',
    color: '#cccccc',
    cursor: 'pointer'
  },
  textField: {
    margin: 0
  },
  buyingFor: {
    marginTop: '1em',
    marginBottom: '1em',

  },
  buyingForTypo: {
    color: '#d8d8d8',
    paddingTop: '2px'
  },
  radio: {
    padding: 0
  },
  radioLable: {
    color: '#d8d8d8',
    paddingTop: 0,
    paddingLeft: '5px'
  }
};

export const tableStyles = {
  table: {
    minWidth: 200,
  },
  tableHeader: {
    fontWeight: 600,
    fontSize: '12px',
    padding: '5px',
    paddingLeft: '15px',
    color: 'white',
    borderBottom: 0,
    lineHeight: '1rem'
  },
  headerRow: {
    height: '40px',
    backgroundColor: '#666666',
  },
  batchRow: {
    height: '45px',
    borderBottom: '1px solid #666666',
  },
  tableIconCell: {
    color: '#e8e8e8',
    padding: '2px',
    paddingRight: '5px',
    borderBottom: 0,
  },
  tableCell: {
    color: '#e8e8e8',
    padding: '2px',
    paddingLeft: '15px',
    borderBottom: 0,
  },
  subtotal: {
    color: '#e8e8e8',
    padding: '2px',
    borderBottom: 0,
  },
  currency: {
    color: '#e8e8e8',
    padding: '2px',
    paddingRight: '1px',
    borderBottom: 0,
  },
  tableTypo: {
    color: '#e8e8e8',
    textTransform: 'capitalize',
  },
  tableTypoCaption: {
    color: '#c6c6c6',
    textTransform: 'capitalize',
  },
  icons: {
    color: 'white',
    padding: '4px',
    cursor: 'pointer',
  },
  addIcon: {
    padding: 0,
    fontSize: '20px',
    marginTop: '2px',
  },
  iconsCell: {
    display: 'inline-flex',
    paddingLeft: '10px',
  },
  paperIcon: {
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    maxWidth: '20px',
    cursor: 'pointer',
  },
  paperInput: {
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '35px',
    height: '25px',
    paddingLeft: '5px',
  },
  totals: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em',
    marginBottom: 0,
  },
  discountWrapper: {
    display: 'flex',
    margin: '17px',
    marginTop: 0,
    marginBottom: '5px',
  },
  discount: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  discountNum: {
    color: 'white',
    padding: '2px',
    fontSize: '13px',
  },
  discountTypo: {
    color: '#5773ed',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '2px',
    fontSize: '13px',
  },
  discountTotal: {
    color: 'white',
    padding: '2px',
    fontSize: '13px',
  },
  payButton: {
    justifyContent: 'space-between'
  },
  buttonLabel: {
    fontSize: '25px',
  },
};

export const tableQuantityStyles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconsGrid: {
    paddingLeft: '2px',
  },
  icon: {
    margin: 0,
    fontSize: '20px',
    color: '#707070',
    cursor: 'pointer',
  },
  iconBatch: {
    margin: 0,
    fontSize: '15px',
    color: '#707070',
    cursor: 'pointer',
    height: '10px'
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  iconsCell: {
    display: 'inline-flex',
  },
  iconsCellBatch: {
    display: 'inline-flex',
    marginLeft: '-1.5em'
  },
  paperInput: {
    justifyContent: 'center',
    backgroundColor: '#707070',
    width: '40px',
    height: '30px',
    paddingLeft: '5px',
    border: '1px solid #FAF33E',
  },
  paperBatchInput: {
    marginTop: '5px',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '40px',
    height: '15px',
    paddingLeft: '5px',
    color: '#707070',
  },
  paperIcon: {
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    maxWidth: '20px',
  },

  paperBatchIcon: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    maxWidth: '20px',
    maxHeight: '0'
  },

});

export const addCustomerDialog = {

  buttonWrapper: {
    paddingRight: '12px'
  },
  cancelButton: {
    width: '120px',
    margin: '0.6em',
  },
  addButton: {
    width: '120px',
    margin: '0.6em',
  },
  cartAddButton: {
    marginLeft: '5px',
  },
  productAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  listedHeldItems: {
    height: '80px'
  },
  dialogTitle: {
    backgroundColor: '#FAF33E',
    paddingBottom: 0,
    paddingTop: '5px'
  },
  dialogContent: {
    padding: 0,
  },
  dialogContentGrid: {
    paddingBottom: 0,
  },
  phoneInputLabel: {
    color: '#898989'
  },
  phoneInputHelper: {
    color: '#ff0000'
  },
  dialogContentGridTop: {
    paddingTop: 0,
  },
  holdSaleGridTop: {
    paddingTop: '12px',
  },
  holdSaleGridRight: {
    paddingRight: '12px',
  },
  GridPaddingRight: {
    paddingRight: 0,
  },
  list: {
    paddingTop: 0,
  },
  retrieveIcon: {
    marginRight: '10px',
    color: '#878205',
  },
  cautionIcon: {
    fontSize: '3em'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  containerStyles: {
    width: '100%',
    marginTop: '8px',
  },
};

export const popper = {
  paper: {
    marginRight: '15px',
    backgroundColor: '#ededed',
    width: '20em',
    maxWidth: '20em'
  },
  gridWrapper: {
    padding: '15px',
  },
  textField: {
    margin: 0,
    width: '100%'
  },
  addButton: {
    padding: '.73rem 1.1rem',
    height: '50px'
  },
  innerWrapper: {
    padding: '.8rem .6rem .3rem'
  },
  buttonWrapper: {
    justifyContent: 'right'
  },
  cartAddButton: {
    marginLeft: '5px',
  },
  backButton: {
  },
  typo: {
    marginLeft: '10px',
    color: '#878205'
  },
  noteTypo: {
    color: '#878205'
  },
  rootGrid: {
    padding: '15px',
    paddingTop: '5px',
    paddingBottom: '5px'
  }
};

export const addCustomerPopper = {
  rootPaper: {
    marginTop: '5px',
    backgroundColor: '#ededed',
    width: '29.25em',
    maxWidth: '29.25em'
  },
  zeroBottomPadding: {
    paddingBottom: 0
  },
  errorPadding: {
    padding: '5px 10px 0'
  },
  listedCustomers: {
    paddingBottom: 0,
    maxHeight: '18em',
    overflow: 'auto',
  },
  addCircleIcon: {
    marginRight: '4px',
    marginTop: '3px',
    fontSize: '15px',
    color: '#878205'
  },
  typoWrapper: {
    padding: '10px',
    textAlign: 'center'
  },
  typo: {
    color: '#878205',
    cursor: 'pointer'
  }
};

export const customerDetailsDialog = {
  dialogTitle: {
    backgroundColor: '#FAF33E',
    padding: '1em 1.5em 1em 2.5em',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
  },
  name: {
    fontWeight: '500',
    color: '#424242'
  },
  icon: {
    marginTop: '0.5em'
  },
  dialogContent: {
    padding: 0
  },
  loyaltyPaper: {
    margin: '1.5em 2.5em',
    padding: '1em 2.5em',
    backgroundColor: '#E8E8E8',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)'
  },
  captionText: {
    color: '#808080'
  },
  momentDate: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#424242',
  },
  loyaltyMember: {
    color: '#424242',
    paddingLeft: '4.6em'
  },
  loyaltyPoints: {
    color: '#424242',
    paddingLeft: '4em'
  },
  storeCredit: {
    color: '#424242',
  },
  rowHeader: {
    padding: '0.3em 2.5em',
    backgroundColor: '#E8E8E8',
  },
  rowHeaderTypo: {
    color: '#424242'
  },
  contactDetails: {
    margin: '1.5em 2.5em',
  },
  contactInner: {
    marginTop: '1em'
  },
  addressText: {
    color: '#424242',
    fontSize: '13px',
    margin: '0px'
  },
};

export const saleDetailsDialog = {
  center: {
    textAlign: 'center'
  },
  dialogTitle: {
    padding: '1em 1.5em 1em 2.5em'
  },
  name: {
    fontWeight: '500',
    color: '#424242',
    fontSize: '20px',
    marginLeft: '-0.8em'
  },
  icon: {
    fontSize: 'large',
    marginRight: '-0.7em'
  },
  dialogContent: {
    padding: '1rem 1.4rem',
    backgroundColor: '#E8E8E8',
  },
  saleBatchListPaper: {
    marginBottom: '0.2rem',
    padding: '0.5rem 1rem',
    boxShadow: '.1rem .1rem .1rem rgba(0, 0, 0, 0.25)'
  },
  captionText: {
    color: '#808080'
  },
  captionTextProdType: {
    color: '#808080',
    marginLeft: '-1.2em'
  },
  BatchNum: {
    marginLeft: '-1.5em'
  },
  saleBatchListPaperColor: {
    color: 'rgb(78, 76, 76)',
    marginTop: '5px'
  },
  saleBatchListPaperQtyLeft: {
    color: 'rgb(78, 76, 76)',
    marginLeft: '3.7em',
    marginTop: '5px'
  },
  saleBatchListPaperInput: {
    color: 'rgb(78, 76, 76)',
    marginLeft: '4.2em',
    marginTop: '5px'
  },
  MuiIconButtonCheck: {
    padding: 0
  },
  checkboxWrapper: {
    margin: 'auto 0'
  },
  requiredQuantity: {
    marginRight: '5px'
  },
  leftQuantity: {
    marginRight: '10px'
  },
  leftPadding: {
    paddingLeft: '1rem'
  }
};
