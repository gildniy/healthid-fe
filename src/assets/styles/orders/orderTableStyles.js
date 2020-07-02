const orderTableStyles = {
  root: {
    '&:nthOfType(odd)': {
      backgroundColor: '#0000',
    },
  },
  paper: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  customStyle: {
    padding: '1rem 2rem 1rem 0',
    textAlign: 'right'
  },

  customName: {
    padding: '1rem 0 1rem 2rem',
    textAlign: 'left'
  },

  customTotal: {
    paddingRight: 0,
  },

  totalStyle: {
    fontWeight: 600,
    fontSize: '18px',
  },

  iconStyle: {
    paddingRight: '2.2rem',
  },

  notReceivedStyle: {
    paddingRight: '18px',
    color: '#808080',
    paddingLeft: '2rem'
  },

  grandStyle: {
    fontWeight: 600,
    fontSize: '18px',
  },

  head: {
    fontSize: 14,
    fontWeight: 'bolder',
    backgroundColor: '#E8E8E8',
    color: '#424242',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    whiteSpace: 'noWrap',
    textAlign: 'right'
  },
  headName: {
    fontSize: 14,
    fontWeight: 'bolder',
    backgroundColor: '#E8E8E8',
    color: '#424242',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    whiteSpace: 'noWrap',
    textAlign: 'left'
  },

  body: {
    fontSize: '1em',
    color: '#424242',
    lineHeight: '20px',
    letterSpacing: '.05em'
  },
  currency: {
    opacity: 0.3,
    padding: '2px',
    fontWeight: 'lighter'
  },
  headerTypo: {
    padding: '1rem 2rem',
    fontWeight: 500
  }
};

export default orderTableStyles;
