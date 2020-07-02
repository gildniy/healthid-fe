export const orderDescriptionStyles = theme => ({
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
  backButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
  },
  buttonGrid: {
    position: 'absolute',
    right: '4em',
  },
  closeOrderButton: {
    marginRight: -15,
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '8px',
    padding: '5px 20px'
  },
  card: {
    maxWidth: 345,
    margin: 'auto'
  },
  media: {
    width: '97px',
    height: '113px',
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  orderNameStyles: {
    width: '100%',
    position: 'relative',
    paddingBottom: '43px'
  },
  paperTitle: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '500',
    color: '#424242',
  },
  titleLine: {
    width: '108.9%',
    marginLeft: '-2.4rem',
    backgroundColor: '#E4E4E4',
    height: '2px',
    border: '0px',
    marginTop: '-0.5rem',
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '2rem'
  },
  orderName: {
    color: '#424242',
    fontSize: '28px',
    fontWeight: '400',
  },
  orderID: {
    color: '#424242',
    opacity: '0.5',
    fontSize: '21px',
    fontFamily: 'Avenir'
  },
  orderInfo: {
    listStyleType: 'none',
  },
  orderInfoItem: {
    margin: '17px 0 10px 0',
  },
  orderInfoLabel: {
    color: '#424242',
    opacity: '50%',
    fontWeight: '100',
    fontSize: '18px',
  },
  orderInfoValue: {
    color: '#424242',
    fontSize: '1em',
    fontWeight: '100',
  },

  buttonsDiv: {
    textAlign: 'center',
  },
  buttonMainGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0.3em 0'
  },
  viewButton: {
    borderRadius: '.2em',
    color: '#424242',
    width: '150px',
  },
  invoiceLabel: {
    color: '#A3A3A3',
    fontSize: '1em',
    padding: '1em 0',
  },

  invoiceContainer: {
    margin: 'auto',
  },
  orderHelper: {
    color: '#A3A3A3',
    fontSize: '12px',
  },
  headerTypo: {
    padding: '.8rem 0',
    fontWeight: 500
  },
  headerContainer: {
    padding: '.8rem 2rem',
  },
  popperBtn: {
    padding: '.4rem'
  },
  progress: {
    color: '#a7a6a6',
    margin: 0
  },
  progressWrapper: {
    paddingTop: '4.6px',
    paddingRight: '4px'
  }
});

export const receiveOrderStyles = {
  gridContainer: {
    color: '#424242',
    opacity: '0.6'
  },
  notes: {
    color: '#000000',
    fontSize: '1.25rem'
  },
  autofillStyles: {
    // display: 'flex',
    // flexWrap: 'nowrap',
    // placeContent: 'end space-between',
    // width: '100%',
    // position: 'relative',
    // top: '-8px'
  },
};
