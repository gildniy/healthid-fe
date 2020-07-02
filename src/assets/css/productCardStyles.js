const productCardStyles = () => ({
  paper: {
    position: 'relative',
    height: '11rem',
    padding: '.8rem',
    paddingRight: '.1rem',
    border: '0.5px solid rgba(250, 243, 62, 0.3)',
    cursor: 'pointer',
    transition: 'all .1s',
    '&:active': {
      transform: 'translateY(.1rem)',
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2)'
    }
  },
  media: {
    width: '65px',
    height: '65px',
    objectFit: 'cover',
    objectPosition: 'right',
  },
  cardContent: {
    fontSize: 10,
  },
  productName: {
    textTransform: 'capitalize',
    fontSize: '.8rem',
    fontWeight: 600,
    color: '#424242',
  },
  productUpc: {
    textTransform: 'uppercase',
    fontSize: '.7rem',
    fontWeight: 500,
    color: '#424242',
  },
  dispensingSize: {
    fontStyle: 'oblique',
    color: 'gray',
    textTransform: 'lowercase',
    '&::first-letter': {
      textTransform: 'capitalize',
    }
  },
  categoryGrid: {
    paddingTop: '.6em',
  },
  productCategory: {
    fontSize: '.85rem',
    fontStyle: 'italic',
    color: '#424242',
    textTransform: 'capitalize',
    fontWeight: 'lighter',
  },
  productPrice: {
    position: 'absolute',
    bottom: '.8rem',
    left: '.8rem',
    color: '#424242',
    fontWeight: 600,
    '&::first-letter': {
      fontWeight: 400,
    }
  },
  addIcon: {
    cursor: 'pointer'
  },
  content1: {
    paddingLeft: '0.1em',
    paddingRight: '0.1em',
    paddingBottom: '0.1em',
    paddingTop: '0.5em',
  },
  content2: {
    padding: '0.1em'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '2rem',
  },
  cardAction: {
    padding: '0.2em'
  },
  iconButton: {
    fontSize: '0.8em',
    padding: '0.2em'
  }
});
export const addNewCategories = {
  rootPaper: {
    marginTop: '5px',
    backgroundColor: '#ededed',
    width: '19.5em',
    maxWidth: '29.25em'
  },
  zeroBottomPadding: {
    paddingBottom: 0
  },
  listedCustomers: {
    paddingBottom: 0,
    maxHeight: '18em',
    overflow: 'auto',
  },
  addCircleIcon: {
    marginRight: '4px',
    marginTop: '3px',
    fontSize: '15px',
    color: '#878205'
  },
  typoWrapper: {
    padding: '10px',
    textAlign: 'center'
  },
  typo: {
    color: '#878205',
    cursor: 'pointer'
  }
};

export default productCardStyles;
