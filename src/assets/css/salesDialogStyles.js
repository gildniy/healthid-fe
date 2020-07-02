const salesDialogStyles = {
  root: {
    hideBackdrop: 'true',
    invisible: 'true'
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  listItemText: {
    display: 'flex',
    justifyItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  salesSummary: {
    textAlign: 'center'
  },
  subTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 18
  },
  discountTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 16,
  },
  sumHeaders: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4e4e4e'
  },
  discountHeaders: {
    fontSize: 16,
    fontWeight: 'bolder'
  },
  paymentHeaders: {
    fontWeight: 'lighter',
    color: '#4e4e4e'
  },
  total: {
    color: '#702632',
    fontWeight: 'bold',
    fontSize: 16,
  },
  finalSaleTotal: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  finalSaleSum: {
    color: '#424242',
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recieptheader: {
    fontWeight: 100,
    color: '#707070'
  },
  totalSum: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#702632',
  },
  makeSalediv: {
    textAlign: 'center',
    paddingBottom: '0.8em',
    paddingTop: '0.8em'
  },
  makeSaleButton: {
    width: '300px',
    padding: '1em',
    backgroundColor: '#f4f142'
  },
  radioButton: {
    marginLeft: '1em',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  mainDialog: {
    padding: 0,
  },
  lists: {
    margin: '0 1.5rem'
  },
  saleButtonDiv: {
    textAlign: 'end',
    marginRight: '1.6rem'
  },
  halfDivider: {
    marginLeft: '1rem',
    marginRight: '1rem',
    backgroundColor: '#F5F5F5'
  },
  saleButton: {
    border: '1px solid',
    borderRadius: '10px',
    margin: '1rem .6rem',
    width: '200px',
    padding: '0.5em'
  },
  confirmClosePaperProps: {
    width: '100%'
  },
  anchorOrigin: {
    vertical: 'right',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  gridContainer: {
    padding: '1em'
  },
  confirmButton: {
    margin: '1em',
    border: '2px solid',
    borderRadius: '25px',
    width: '100px',
  },
  titlePaperStyle: {
    width: '100%',
    borderRadius: 0
  },
  dialogTitleStyle: {
    padding: '1rem'
  },
  notesIcon: {
    color: '#9a9a9a',
    cursor: 'pointer'
  },
  arrowLabel: {
    color: '#4e4e4e',
    padding: '.2rem'
  },
  arrowButton: {
    color: '#4e4e4e'
  },
  notesHeader: {
    paddingBottom: '1rem',
    paddingLeft: '.45rem',
    fontWeight: 600,
    color: '#424242'
  },
  rowHeading: {
    fontSize: '.8rem',
    color: '#A3A3A3',
    whiteSpace: 'nowrap'
  },
  headingDash: {
    fontSize: '.8rem',
    fontWeight: 500,
    color: '#424242'
  },
  rowNote: {
    paddingLeft: '.5rem',
    fontSize: '.8rem',
    fontWeight: 500,
    color: '#424242',
  },
  notesPopOverAnchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  notesPopOverTransformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  notesPopOverGrid: {
    width: '20rem'
  },
  notesPopOverGridItem: {
    padding: '.8rem'
  },
  cashInput: {
    width: '10rem',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    fontSize: '18px',
    color: '#626262',
  },
  cashListItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0
  },
  paymentMethodText: {
    padding: '0 6px 0 16px',
    margin: '0 1.5rem'
  },
  productListCell: {
    display: 'grid',
    fontSize: 15,
    textTransform: 'capitalize',
    padding: '.2rem 2.4rem',
    borderBottom: '1px solid #d9d9d9',
  },
  discountedTotalCell: {
    fontSize: 15,
    textAlign: 'right',
    padding: '.2rem 2.4rem .2rem .5rem',
    borderBottom: '1px solid #d9d9d9'
  },
  productDispensingSize: {
    color: 'gray',
    textTransform: 'capitalize'
  },
  generalProductListCell: {
    fontSize: 15,
    padding: '.2rem .5rem',
    borderBottom: '1px solid #d9d9d9'
  },
  paymentMargins: {
    margin: '0 1.5em',
  },
  discountSpan: {
    textDecoration: 'underline',
    color: '#1C7CFF'
  },
  paymentFormControlDiv: {
    padding: '0em 4em 0 4em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 4,
    flexWrap: 'wrap'
  },
  recieptTableRow: {
    height: 0
  },
  receiptTableCell: {
    borderBottom: 0,
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    fontWeight: 600
  },
  receiptDiscountTotal: {
    borderBottom: 0,
    fontSize: '0.7rem',
    fontWeight: 600
  },
  receiptContainerGrid: {
    marginTop: '2em',
    marginBottom: '2em'
  },
  receiptPaper: {
    width: '520px',
    maxHeight: '700px',
    overflow: 'auto',
    marginBottom: '0.8em'
  },
  printGridItem: {
    flexBasis: '0%'
  },
  printIconButton: {
    padding: 0
  },
  printImage: {
    width: '4em'
  },
  printText: {
    textAlign: 'center'
  },
  productTableCell: {
    borderBottom: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4e4e4e',
    padding: '.2rem .5rem .2rem 2.4rem'
  },
  customTableCell: {
    borderBottom: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4e4e4e',
    padding: '.2rem .5rem'
  },
  totalCostTableCell: {
    borderBottom: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4e4e4e',
    textAlign: 'right',
    padding: '.2rem 2.4rem .2rem .5rem'
  },
  tableBodyDiv: {
    overflow: 'auto',
    height: '150px',
  },
  dialogTableColumn1: {
    width: '40%',
  },
  dialogTableColumn2: {
    width: '15%',
  },
  dialogTableColumn3: {
    width: '15%',
  },
  dialogTableColumn4: {
    width: '15%',
  },
  dialogTableColumn5: {
    width: '15%',
  },
  discountColumn: {
    width: '10%',
    padding: 0,
    textAlign: 'center'
  },
  customTableCellCol2: {
    width: '10%',
    textAlign: 'center',
    padding: 0
  },
  customTableCellDiv: {
    width: '100%',
    backgroundColor: '#e8e8e8',
    borderBottom: '1px solid #D7D7D7'
  },
  reciepttemplateMainDiv: {
    marginTop: '1em'
  },
  reciepttemplateGridContainer: {
    paddingBottom: '10px'
  },
  businessName: {
    textTransform: 'uppercase',
    lineHeight: 1.8,
    fontSize: '0.85rem',
    fontFamily: 'Open Sans',
    fontWeight: 900,
    color: '#000'
  },
  address: {
    textTransform: 'capitalize',
    lineHeight: 1.8,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Open Sans',
  },
  tableDiv: {
    width: '520px',
    marginTop: '10px'
  },
  tableRow1: {
    height: 0,
    padding: 0
  },
  dateCell: {
    color: '#000000',
    paddingRight: '0.5em',
    fontSize: '0.7rem',
    fontWeight: 600,
    width: '30%'
  },
  generalRowStyle: {
    height: 0
  },
  row2: {
    height: '1px',
    borderBottom: '0.4px solid gray'
  },
  row3: {
    height: '8px'
  },
  rowRedundantCell: {
    borderBottom: 0,
    padding: 0
  },
  subtotalTitleCell: {
    borderBottom: 0,
    padding: 0,
    fontSize: '0.7rem',
    fontWeight: 600
  },
  subtotalCell: {
    borderBottom: 0,
    fontSize: '0.7rem',
    fontWeight: 600
  },
  purchaseTotalTitleCell: {
    padding: 0,
    fontSize: '0.7rem',
    fontWeight: 600
  },
  purchaseTotalCell: {
    fontSize: '0.7rem',
    fontWeight: 600
  },
  amountTitleCell: {
    padding: 0,
    fontSize: '0.75rem',
    fontWeight: 900
  },
  amountCell: {
    fontSize: '0.75rem',
    fontWeight: 900
  },
  changeTitleCell: {
    borderBottom: 0,
    padding: 0,
    fontSize: '0.75rem',
    fontWeight: 900
  },
  changeCell: {
    borderBottom: 0,
    fontSize: '0.75rem',
    fontWeight: 900
  },
  redundantRow4: {
    height: '2px'
  },
  cashierCell: {
    paddingLeft: '0.8rem',
    textTransform: 'capitalize',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  cashierNameCell: {
    paddingLeft: '0',
    textTransform: 'capitalize',
    fontSize: '0.75rem',
    fontWeight: 600
  },
  registerCell: {
    paddingRight: '0.8em',
    textAlign: 'end',
    fontSize: '0.75rem',
    fontWeight: 600
  },
  barcodeGrid: {
    marginTop: '1em',
    textAlign: 'center'
  },
  barcodeDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.8em',
    fontFamily: 'Open Sans'
  },
  barcodeImage: {
    width: '200px',
    height: '55px',
    display: 'flex',
    justifyContent: 'center'
  },
  thanksText: {
    fontSize: '12px',
    fontWeight: 'regular',
    fontFamily: 'Open Sans',
  },
  paymentWayContainer: {
    width: '169px',
    position: 'relative',
    paddingTop: '10px'
  },
  paymentWay: {
    width: '169px',
    height: '62px',
    border: '1px solid #A3A3A3',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '18px',
    paddingRight: '24px',
  },
  paymentWayName: {
    backgroundColor: 'white',
    color: '#424242',
    fontSize: 12,
    width: '100px',
    paddingLeft: '15px',
    position: 'absolute',
    top: '-10px',
    left: '10px',
  },
  paymentWayCurrency: {
    color: '#757575',
    marginRight: '15px',
    fontSize: '16px'
  },
  paymentWayInput: {
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '18px',
    border: 'none',
    color: '#424242',
    outline: 'none'
  }
};

export default salesDialogStyles;
