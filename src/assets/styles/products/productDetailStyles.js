export const productDetailStyles = theme => ({
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    borderRadius: 10
  },
  dividerDiv: {
    marginBottom: '1.5rem',
    marginTop: '1rem',
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    color: '#424242',
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  newTextFields: {
    marginBottom: '5px'
  },
  descriptionFields: {
    marginBottom: '5px'
  },
  descriptionText: {
    marginTop: '1.1em',
    overflow: 'scroll',
    width: '100%',
    height: '7em',
    wordWrap: 'break-word;'
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
  tagsRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagsHeading: {
    marginRight: '80%',
    marginBottom: '4px',
    color: '#898989'
  },
  tagChip: {
    margin: theme.spacing(0.25),
    marginTop: '15px',
    borderRadius: '7px',
    background: '#424242',
    color: 'white',
    marginBottom: '45px'
  },
  batchTextFields: {
    marginBottom: '5px',
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0 2.4em'
  },
  batchDiv: {
    width: '100%',
    marginLeft: '0em',
    padding: '1.2em 2em',
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
    position: 'relative',
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '72%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  arrowIcon: {
    fontSize: 30,
    color: '#000000',
    cursor: 'pointer'
  },
  buttonsDiv: {
    textAlign: 'right'
  },
  backButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
  },
  buttonMainGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  batchRow: {
    height: '25px',
  },
  buttonGrid: {
    position: 'absolute',
    right: '4em',
  },
  approveButton: {
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '20px',
    padding: '5px 43px'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#424242 !import',
    }
  },
  editButton: {
    border: 'thin rgb(66, 66, 66) solid',
    width: '150px',
    borderRadius: '8px',
  },
  approveEditButton: {
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 43px'
  },
  editProposedButton: {
    marginRight: '20px',
    backgroundColor: '#267EF8',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 50px'
  },
});

export const tableStyles = {
  table: {
    width: '100%',
  },
  batchHeader: {
    boxShadow: '0 0 3px #00000029',
    padding: 0,
    verticalAlign: 'center',
    justifyContent: 'space-between',
    height: 'auto'
  },
  tableHeader: {
    fontSize: '0.8em',
    paddingRight: '0px',
    width: '112px',
    marginRight: '0px',
    color: 'black',
    whiteSpace: 'nowrap'
  },
  tableHeader3: {
    minWidth: '5em',
    maxWidth: '5em',
    padding: 0
  },
  tableHeader1: {
    width: '105px',
    fontSize: '0.8em',
    paddingLeft: '20px',
    paddingRight: '0px',
    marginRight: '0px',
    color: 'black',
    whiteSpace: 'nowrap'
  },
  footerHeader: {
    fontWeight: 500,
    fontSize: '0.87em',
    paddingLeft: '0px',
    paddingBottom: '10px',
    paddingTop: '10px',
    color: 'black'
  },
  tableFooter: {
    width: '70px',
    fontWeight: 900,
    fontSize: '15px',
    color: '#424242',
    border: '1px solid #cccccc',
  },
  batchRow: {
    height: '25px',
  },
  tableCell: {
    width: '112px',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingRight: '0px',
    marginRight: '0px',
    color: '#424242',
    fontSize: '0.8em',
    whiteSpace: 'nowrap'
  },
  tableCell1: {
    minWidth: '105px',
    paddingLeft: '20px',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingRight: '0px',
    marginRight: '0px',
    color: '#424242',
    fontSize: '0.8em',
  },
  total: {
    borderStyle: 'none',
    margin: '1.2em 0',
  },
  textGrandTotal: {
    fontWeight: 500,
    fontSize: '0.9em',
    paddingLeft: '2.5rem'
  },
  textGrandTotal1: {
    paddingLeft: '2.7em',
    fontWeight: 500,
    fontSize: '0.9em',
  },
  totalGrid: {
    width: '13.4em',
    paddingTop: '10px',
    paddingBottom: '10px',
    border: '1px solid #EAE8E8',
  },
  textTotal: {
    paddingLeft: '2.5em',
    fontWeight: 500,
    fontSize: '1em',
  },
  textTotal1: {
    fontWeight: 500,
    fontSize: '0.9em',
    paddingLeft: '4.5rem',
  },
  grandTotalGrid: {
    width: '19em',
    paddingTop: '10px',
    marginRight: '0px',
    paddingBottom: '10px',
    border: '1px solid #EAE8E8',
    borderLeft: 'none'
  },
  tableCellDot: {
    paddingTop: '0px',
    paddingBottom: '0px',
    minWidth: '5em',
    maxWidth: '5em',
    paddingLeft: '10px',
    color: '#424242',
  },
  tableCellRight: {
    padding: '5px',
    border: '1px solid #cccccc',
  },
};
