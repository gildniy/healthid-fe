const ButtonStyle = {
  border: '2px solid #424242',
  color: '#424242',
  width: '130px',
  height: '40px',
  borderRadius: '10px',
  opacity: 1,
  fontSize: '12px',
  marginRight: '10px'
};

export const batchDetailsStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
    color: '#424242',
  },
  paper: {
    paddingBottom: '40px',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: '150px',
    width: '150px',
    borderRadius: '100%',
    margin: '0 0 0 30%'
  },
  category: {
    marginBottom: '2em'
  },
  contactDetails: {
    marginTop: '30px',
    width: '100%',
    display: 'flex',
    padding: '0 10px'
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: '34px'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center',
    color: '#424242',
    fontSize: '20px',
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  notesButton: {
    paddingTop: '5px',
  },
  newTextFields: {
    marginBottom: '25px'
  },
  descriptionFields: {
    paddingTop: '5px',
    marginBottom: '5px',
    fontSize: '25px',
    color: '#424242',
  },
  descriptionFields2: {
    paddingTop: '5px',
    marginTop: '5px',
    fontSize: '15px',
    fontWeight: '800',
    opacity: '0.7',
    color: '#424242',
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 2.4em',
    marginTop: '15px',
    color: '#424242'
  },
  tableGrid: {
    width: '955px',
    marginLeft: '0em',
    padding: '1em 4em 1em 3em'
  },
  containerGrid2: {
    width: '100%',
    marginLeft: '0em',
    marginTop: '15px',
    padding: '1em 0.4em 1em 2em;'
  },
  addressText: {
    fontSize: '15px',
    margin: '0px'
  },
  addressTextHeader: {
    color: '#8a8a8a',
    fontSize: '13px'
  },
  textContainerGrid: {
    width: '75%',
    marginLeft: '0em',
    padding: '1em'
  },
  childGrids: {
    padding: '1 2em',
    height: '5%'
  },
  arrowButtonGrid: {
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '75%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  arrowIcon: {
    fontSize: 30,
    color: '#000000',
    cursor: 'pointer'
  },
  arrowSpace: {
    marginRight: '20px'
  },
  buttonsDiv: {
    textAlign: 'right'
  },
  backButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
    marginRight: '4%'
  },
  buttonMainGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  buttonGrid: {
    position: 'absolute',
    right: '17%'
  },
  saveButton: {
    minWidth: '60px',
    padding: '0px 30px',
    height: '5vh',
    border: 'none',
    borderRadius: '10px',
    marginTop: '4vh',
    marginBottom: '4vh',
    fontSize: '18px'
  },
  approveButton: {
    border: 'none',
    color: '#fff',
    backgroundColor: '#424242',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px',
    marginRight: '10px',
    marginLeft: '20px'
  },
  editButton: {
    border: '2px solid #424242',
    color: '#424242',
    width: '130px',
    height: '40px',
    borderRadius: '10px',
    opacity: 1,
    fontSize: '12px',
    marginRight: '10px'
  },
  barCodeBtn: {
    ...ButtonStyle,
    border: 'none',
    color: '#fff',
    backgroundColor: '#424242',
    marginLeft: '20px',
    width: '200px',
    opacity: '0.7'
  },
  preferenceBtn: {
    ...ButtonStyle,
    border: 'none',
    color: '#fff',
    backgroundColor: '#424242',
    marginLeft: '20px',
    width: '160px',
    opacity: '1'
  },
  spaceDiv: {
    height: '70px'
  },
  IconImage: {
    position: 'relative',
    top: '-3px',
    width: '25px'
  },
  IconText: {
    display: 'block',
    marginLeft: '10px',
    marginBottom: '8px',
    position: 'relative',
    top: '-3px'
  }
});


export const tableStyles = {
  logo: {
    marginRight: '20px',
  },
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '70%'
  },
  noteHeader: {
    width: '100%',
    justifyContent: 'space-between'
  },
  tableHeader: {
    fontWeight: 500,
    fontSize: '15px',
    color: 'black'
  },
  tableHeaderCenter: {
    fontWeight: 500,
    fontSize: '15px',
    color: 'black',
    paddingLeft: '0px'
  },
  noteRow: {
    cursor: 'pointer'
  },
  cell: {
    width: '30%'
  },
  cellMiddle: {
    width: '40%',
    paddingLeft: '0px'
  },
  cellRight: {
    width: '18%',
    paddingLeft: '0px'
  },
  cellButtonRight: {
    width: '12%',
    paddingLeft: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  cellIcon: {
    display: 'inline-flex',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  iconButtons: {
    padding: '10px',
  },
  contactDetails: {
    margin: '30px 0',
    width: '100%',
    display: 'flex',
    padding: '0 10px'
  },
};

export const QualityIconsStyles = {
  gridContainer: {
    marginLeft: '5%',
    width: '90%',
    marginBottom: '2%'
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
    padding: '0',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  notesWrapper: {
    paddingBottom: '4rem',
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
    width: '18.2rem'
  },
  zeroBottomPadding: {
    paddingBottom: 0
  },
  listedCustomers: {
    paddingBottom: 0,
    maxHeight: '18em',
    overflow: 'auto',
  },
  iconLabel: {
    fontSize: '0.8rem',
    color: '#424242',
    opacity: '0.5',
    marginBottom: '10px'
  }
};
