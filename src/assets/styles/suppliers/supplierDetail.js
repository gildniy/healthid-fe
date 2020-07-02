export const supplierDetailStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper
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
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0 2.4em',
    marginTop: '15px',
    marginBottom: '15px'
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
  approveButton: {
    border: 'none',
    color: '#fff',
    backgroundColor: '#424242',
    width: '160px',
    height: '40px',
    borderRadius: '8px',
    opacity: 1,
    fontSize: '12px',
    marginRight: '10px',
    marginLeft: '25px'
  },
  editButton: {
    border: '1.5px solid #424242',
    color: '#424242',
    width: '160px',
    height: '40px',
    borderRadius: '8px',
    opacity: 1,
    fontSize: '14px',
    marginRight: '10px'
  },
  spaceDiv: {
    height: '70px'
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
    width: '30%',
    paddingTop: '15px'
  },
  cellLeft: {
    width: '30%',
    paddingLeft: '50px',
    paddingTop: '15px'
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
    marginRight: '5px'
  },
  registerIconButtons: {
    padding: '10px',
    marginRight: '15px'
  },
  contactDetails: {
    margin: '30px 0',
    width: '100%',
    display: 'flex',
    padding: '0 10px'
  },
};
