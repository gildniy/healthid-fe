export const ProductsStyles = {
  div: {
    backgroundColor: 'white',
    minHeight: '100vh',
    position: 'relative',
  },
};


export const AfterSelectToolBarStyles = {
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative',
    transform: 'translateY(-50%)',
  },
  icon: {
    color: '#000',
  },
  inverseIcon: {
    transform: 'rotate(90deg)',
  },
};


export const ToolBarStyles = {
  switchBtn: {
    width: '30px',
    height: '30px',
  },
  searchBtn: {
    width: '20px',
    height: '20px',
  },
  eyeButton: {
    width: '20px',
    height: '20px',
  },
  formButton: {
    width: '20px',
    height: '20px',
  },
  plusButton: {
    height: '0.9em',
  },
  iconButton: {
    marginLeft: '25px',
  },
  iconButtonActive: {
    backgroundColor: '#E3E3E3',
    marginLeft: '25px',
  },
  stockButton: {
    height: '0.9em',
  },
  paperForm: {
    padding: '2rem',
    textAlign: 'center',
    marginRight: '1rem',
  },
  paperBtns: {
    marginTop: '3rem',
  },
  openBtn: {
    border: 'thin rgb(66, 66, 66) solid',
    width: '150px',
    marginLeft: '50px',
    color: 'white',
    background: 'rgb(66, 66, 66)',
    borderRadius: '8px',
    '&:hover': {
      color: 'black',
    }
  },
  savePrint: {
    background: 'red',
  },
  closeBtn: {
    border: 'thin rgb(66, 66, 66) solid',
    width: '150px',
    borderRadius: '8px',
  },
  savePrintPaper: {
    width: '30em',
    padding: '1.5em',
    paddingRight: 0
  },
  savePrintPaper1: {
    width: '30em',
    padding: '1.5em',
    paddingTop: '1em',
    paddingRight: 0
  },
  printButton: {
    width: '4em',
    textAlign: 'center'
  },
  savePrintTypo: {
    textAlign: 'center',
    fontSize: '1.2em',
  },
  saveButtonImg: {
    width: '3em',
    height: '2.4em'
  },
  saveButton: {
    padding: '27px',
    paddingTop: '37px',
    marginLeft: '2em'
  },
  manageButton: {
    backgroundColor: '#3A3A3A',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '12px',
    border: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  menuLink: {
    textDecoration: 'none',
    color: '#424242'
  },
  popper: {
    zIndex: '500',
    marginTop: '15px',
  },
  exportSVG: {
    height: '1em',
  },
  exportSVG2: {
    height: '0.9em',
  },
  switchFormGroup: {
    marginRight: '6rem',
  },
  switchForm: {
    padding: '0rem 2rem',
  },
  searchIcon: {
    width: '20px'
  }
};

export const approveProductsStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  category: {
    marginTop: '1.1em',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    borderRadius: 10
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  productNameStyles: {
    width: '100%',
    position: 'relative'
  },
  productName: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'rgba(60, 57, 57, 0.87)'
  },
  titleLine: {
    width: '110%',
    marginLeft: '-2.4rem',
    backgroundColor: '#E4E4E4',
    height: '2px',
    border: '0px',
    marginTop: '-0.5rem',
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  tagChip: {
    margin: theme.spacing(0.25),
    marginTop: '15px',
    borderRadius: '7px',
    background: '#424242',
    color: 'white',
    marginBottom: '45px'
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0em 2.4em'
  },
  arrowButtonGrid: {
    position: 'relative',
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '72%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  buttonGrid: {
    position: 'absolute',
    right: '4em',
    marginRight: -14
  },
  approveButton: {
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 43px'
  },
  editButton: {
    marginRight: '20px',
    backgroundColor: '#267EF8',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 50px'
  },
});

export const proposeEditStyles = theme => ({
  arrowButtonGrid: {
    textAlign: 'center',
    marginTop: '1em',
    marginBottom: '-1em',
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '78%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  arrowIcon: {
    fontSize: 30,
    color: '#000000',
    cursor: 'pointer'
  },
  buttonGrid: {
    position: 'absolute',
    right: '15%',
  },
  openBtn: {
    border: 'thin rgb(66, 66, 66) solid',
    paddingLeft: '30px',
    paddingRight: '30px',
    marginLeft: '50px',
    color: 'white',
    background: 'rgb(66, 66, 66)',
    borderRadius: '8px',
    '&:hover': {
      color: 'black',
    }
  },
  closeBtn: {
    border: 'thin rgb(66, 66, 66) solid',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0)',
  },
});

export default ProductsStyles;
