export const SupplierFormStyles = {
  paperForm: {
    marginLeft: '15%',
    width: '70%',
    height: '100%',
    marginBottom: '2.5%',
    marginTop: '2%',
    paddingBottom: '1.5%'
  },
  gridContainer: {
    marginLeft: '5%',
    width: '90%',
    marginBottom: '2%'
  },
  textAreaLabel: {
    color: '#A3A3A3',
    fontSize: '16px',
    marginBottom: '1%'
  },
  textArea: {
    maxWidth: '97%',
    border: '1px solid rgb(107, 107, 107)',
    resize: 'none',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 'lighter'
  },
  childGrid: {
    marginTop: '2%'
  },
  tierField: {
    marginTop: '2%',
    paddingLeft: '2%'
  },
  commentaryField: {
    marginTop: '2%',
    paddingRight: '2%'
  },
  lineGrid: {
    marginTop: '1%'
  },
  paymentGrid: {
    marginTop: '4%',
    color: 'rgb(163, 163, 163)'
  },
  selectLabel: {
    marginBottom: '3%'
  },
  uploadGrid: {
    marginTop: '2%',
    marginLeft: '10%'
  },
  buttonGrid: {
    marginTop: '3%',
    paddingBottom: '3%',
    marginLeft: '50%',
    marginRight: '5%',
  },
  descriptionField: {
    marginTop: '9%'
  },
  radioButton: {
    marginTop: '2%',
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  childSlider: {
    marginTop: '0',
    color: 'rgb(163, 163, 163)'
  },
  childSliderLabel: {
    marginTop: '.25rem',
    color: 'rgb(163, 163, 163)'
  }
};

export const ActionButtonStyles = {
  addButton: {
    borderRadius: '20px',
    border: '1px solid',
    width: '50%',
    margin: 'auto 25%'
  },
  doneButton: {
    borderRadius: '20px',
    width: '58%',
    margin: 'auto 1%'
  }
};

export const ImageUploadStyles = {
  container: {
    width: '100%',
    height: '230px',
    border: '1px solid #ccc'
  },
  uploadDiv: {
    margin: 'auto',
    width: '120px',
    height: '110px'
  },
  imgPlaceholder: {
    marginTop: '10%',
    marginLeft: '10%',
    width: '80%',
    height: '60%'
  },
  uploadedImg: {
    marginTop: '30%',
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  },
  button: {
    borderRadius: '25px',
    color: '#939393',
    marginLeft: '32%',
    border: '1px solid #939393',
    textTransform: 'inherit',
    width: '35%',
    padding: '2px',
    marginBottom: '10%',
    marginTop: '15%',
    background: '#fff'
  },
  buttonWide: {
    borderRadius: '25px',
    color: '#939393',
    marginLeft: '40%',
    border: '1px solid #939393',
    textTransform: 'inherit',
    width: '20%',
    padding: '2px',
    marginBottom: '10%',
    marginTop: '7.5%',
    background: '#fff'
  },
  label: {
    marginBottom: '3%',
    fontWeight: 'lighter',
    color: '#939393',
    textAlign: 'center',
    fontSize: '16px'
  },
  chooseButton: {
    borderRadius: '10px',
    color: '#939393',
    margin: '0 auto',
    textAlign: 'center',
    border: '1px solid #939393',
    textTransform: 'inherit',
    width: '9rem',
    padding: '2px',
    background: '#fff'
  },
  main: {
    width: '100%',
    height: '230px',
  },
  placeholder: { width: '100%', height: '100%' },
  img: {
    width: '80%',
    height: 'auto'
  },
  spacing: { marginTop: '.9rem' },
  dragContainer: { height: '15rem', margin: '0 auto' },
  dragItem: { margin: 'auto', width: '120px', height: 'auto' }
};

export const BackActionStyles = {
  topDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '12%',
    marginTop: '2%',
    marginBottom: '2%'
  },
  backIcon: {
    marginTop: '28%',
    color: '#424242'
  },
  header: {
    color: '#424242'
  }
};

export const SearchSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#E4E4E4' : '#FFFFFF',
    color: '#000',
    padding: 7
  }),
  control: (provided, state) => ({
    width: '90%',
    borderBottom: state.isFocused ? '2px solid #ada61f' : '1px solid #939393',
    padding: 0,
    marginTop: '4%',
    color: 'currentColor',
    display: 'inline-flex'
  })
};

export const deliveryStyles = {
  formLabel: {
    display: 'inline-flex', margin: '0px', padding: '0px', marginLeft: '.8rem'
  },
  creditFormLabel: {
    display: 'inline-flex', margin: '0px', padding: '0px', marginLeft: '4rem'
  },

  formLabelSpan(paymentTerms) {
    return {
      display: 'flex',
      float: 'right',
      fontSize: '16px',
      color: `${paymentTerms === 'ON_CREDIT' ? 'rgb(163, 163, 163)' : '#424242'}`
    };
  },

  creditFormLabelSpan(paymentTerms) {
    return {
      display: 'flex',
      float: 'right',
      fontSize: '16px',
      color: `${paymentTerms !== 'ON_CREDIT' ? 'rgb(163, 163, 163)' : '#424242'}`
    };
  },

  textField: {
    background: 'rgba(0, 0, 0, 0.1)',
    color: '#424242',
    marginRight: '0px'
  },
  textInput: {
    display: 'flex',
    alignItems: 'start',
    marginTop: '.75rem',
    paddingLeft: '1.2rem'
  },
  spanDays: {
    paddingLeft: '.5rem',
    paddingRight: '.75rem',
    paddingTop: '.2rem',
    color: 'rgb(163, 163, 163)'
  },
  formList: {
    display: 'flex',
    margin: '0px',
    color: '#A3A3A3',
    padding: '0px',
    alignItems: 'center'
  }
};
