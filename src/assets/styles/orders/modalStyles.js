// eslint-disable-next-line import/prefer-default-export
export const modalStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '50%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    backgroundColor: 'white',
    outline: 'none',
  },
  modal: {
    overflow: 'scroll',
  },
  image: {
    width: '100%',
  },
  buttonModalGrid: {
    width: '100%',
    paddingRight: '5.6em',
    paddingBottom: '12px'
  },
  closeButtons: {
    borderRadius: '.2em',
    width: '150px',
    border: '1px solid #424242',
  },
  printButton: {
    borderRadius: '.2em',
    width: '150px',
    backgroundColor: '#424242',
    color: 'white',
  },
});

export const invoiceModal = {
  continueButton: {
    borderRadius: '.2em',
    width: '150px',
    backgroundColor: '#424242',
    color: 'white',
    marginRight: '20px',

  },
  imageBox: {
    paddingBottom: 0
  },
  dialogBox: {
    paddingBottom: '.5rem',
    paddingTop: '.5rem'
  }
};
