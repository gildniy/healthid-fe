
export const OrderDetailStyles = {
  wrapper: {
    width: '50%',
    top: '30%',
    left: '25%',
    outline: 'none',
    borderRadius: 0,
    paddingTop: '0.4rem'
  },
  title: {
    padding: '15px 0',
    fontWeight: '480',
    color: '#424242',
    fontSize: '1rem',
    'text-align': 'center'
  },
  orderName: {
    color: '#424242'
  },
  textField: {
    color: '#707070',
    width: '92%'
  },
  orderNameContainer: {
    marginLeft: '3rem',
    marginBottom: '2rem'
  },
  orderOutletDueContainer: {
    marginLeft: '3rem',
    marginBottom: '2rem'
  },
  outletContainer: {
    width: '40%',
    marginRight: '2rem'
  },
  dueContainer: {
    width: '42%'
  },
  select: {
    width: '100%',
    marginTop: '0'
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '4%',
    marginBottom: '20px',
    width: '95%'
  },
  saveButton: {
    color: '#fff',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px',
    marginLeft: '35px'
  },
  disabledSaveButton: {
    border: 'none',
    color: '#fff',
    backgroundColor: '#A3A3A3',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px',
    marginLeft: '35px'
  },
  cancelButton: {
    border: '2px solid #424242',
    color: '#424242',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px'
  },
  disabledCancelButton: {
    border: '2px solid #A3A3A3',
    color: '#A3A3A3',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px'
  },
};

export const stockFormStyles = {
  gridContainer: {
    marginLeft: '5%',
    width: '90%',
    color: '#424242',
    opacity: '0.8'
  },
  gridContainer2: {
    marginLeft: '5%',
    width: '90%',
    marginBottom: '30px',
    color: '#424242',
    opacity: '0.8'
  },
  gridWrappers: {
    padding: '8px 16px'
  },
  textAreaLabel: {
    color: '#A3A3A3',
  },
  textArea: {
    'max-width': '140%',
    border: '1px solid rgb(107, 107, 107)',
    resize: 'none',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 'lighter'
  },
  childGrid: {
    marginTop: '2%',
  },
  descriptionsGrid: {
    marginTop: '8%'
  },
  uploadGrid: {
    'padding-left': '15%',
    marginTop: '5%',
    marginLeft: '8%',
  },
  buttonGrid: {
    marginTop: '4%'
  },
  descriptionField: {
    marginTop: '9%',
  },
  batchHeader: {
    margin: '1.2rem auto'
  },
  batchDivider: {
    marginBottom: '3rem'
  },
  iconButton: {
    transition: 'none',
    borderRadius: 0,
    padding: '5px 20px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  notesWrapper: {
    marginLeft: '2%'
  },
  container: {
    width: '90vw',
    padding: '1rem 0 0',
    margin: '0 auto'
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  btnLink: {
    textDecoration: 'none',
  },
  backBox: {
    textAlign: 'center',
  },
  backButton: {
    borderRadius: '50%',
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },
  addButton: {
    width: '9rem',
    marginLeft: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #424242'
  },
  saveButton: {
    width: '9rem',
    marginLeft: '1.5rem',
    borderRadius: '8px'
  },

  // popper
  rootPaper: {
    marginTop: '2px',
    borderRadius: 0,
    backgroundColor: '#F1F1F1',
    width: '16.2rem'
  },
  zIndex: {
    zIndex: '1400'
  },
  zeroBottomPadding: {
    paddingBottom: 0
  },
  listedCustomers: {
    paddingBottom: 0,
    maxHeight: '18em',
    overflow: 'auto',
  },
};

export const ModalStyles = {
  wrapper: {
    position: 'absolute',
    width: '40%',
    top: '30%',
    left: '30%',
    outline: 'none',
    borderRadius: 0,
    paddingTop: '0.4rem'
  },
  orderName: {
    padding: '0.4rem 0.5rem',
    fontWeight: 'bold',
    color: '#424242',
    fontSize: '1rem'
  },
  orderSKU: {
    padding: '0.4rem 0.5rem',
    color: '#424242',
    fontSize: '1rem'
  },
  subTitle: {
    marginRight: '1rem',
    marginBottom: '0.2rem',
    color: '#A3A3A3',
    fontSize: '0.7rem'
  },
  textField: {
    width: '11rem',
    color: '#424242'
  },
  editHeader: {
    borderBottom: 'solid 1px #E8E8E8',
    marginBottom: '1.5rem',
  },
  quantityContainer: {
    width: '14rem',
    marginLeft: '2rem',
    marginBottom: '2rem'
  },
  supplierContainer: {
    width: '14rem',
    marginBottom: '2rem'
  },
  select: {
    width: '11rem',
    marginBottom: '0.7rem',
    color: '#424242'
  },
  iconContainer: {
    marginRight: '1rem',
  },
  titleContainer: {
    padding: '0.4rem 0.5rem'
  },
  ModalText: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#3A3A3A'
  }
};

export const initiateOrderStyles = {
  PaperStyles: {
    width: '80%',
    margin: 'auto'
  },

  newOrderTitle: {
    color: '#424242',
    textAlign: 'center',
    fontSize: '1.3em',
    padding: '5px'
  },

  orderBody: {
    width: '90%',
    margin: '0px auto',
    padding: '30px 0px 0px 0px',
  },

  generalPadding: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },

  autofillContainer: {
    display: 'flex',
    margin: '0px',
    color: '#A3A3A3',
    padding: '0px',
  },

  autofillStyles: {
    display: 'flex',
    flexWrap: 'nowrap',
    placeContent: 'end space-between',
    width: '100%',
    position: 'relative',
    top: '-8px'
  },

  submitContainer: {
    width: '100%',
    textAlign: 'right',
    display: 'block',
    padding: '0px',
  },

  initiateOrderButton: {
    minWidth: '60px',
    padding: ' 0px 30px',
    height: '5vh',
    border: 'none',
    borderRadius: '10px',
    marginTop: '4vh',
    marginBottom: '4vh',
    fontSize: '18px'
  },

  inputLabelProps: {
    style: {
      color: '#A3A3A3',
      fontSize: '18px'
    }
  },

  ulContainer: {
    width: '60%', fontSize: '18px', display: 'inline-flex', padding: '5px', justifyContent: 'space-between', margin: '0px'
  },

  spacings: {
    display: 'inline', position: 'relative', top: '5px', left: '5%', width: '50%', textAlign: 'center'
  },

  UlStyles: { display: 'flex', padding: '0px', width: '100%' },

};
