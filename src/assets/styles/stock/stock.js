const stockControlStyles = {
  sortImage: {
    width: '13px',
    marginLeft: '4px'
  },
  tableHeader: {
    top: '0px',
    left: '0px',
    color: '#393939',
    zIndex: '100',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3',
  },
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative',
    transform: 'translateY(-50%)'
  }
};

export const ToolbarStyles = {
  pippicon: {
    width: '20px',
    height: '20px'
  },
  piptitle: {
    fontSize: '17px',
    fontWeight: 'bold'
  },
  piptags: {
    marginRight: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    padding: '0px',
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '5px'
  },
  pipdescription: {
    fontSize: '12px',
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '7.3em',
    lineHeight: '1.8em'
  },
  pipmain: {
    paddingTop: '7px',
    paddingLeft: '15px',
    paddingBottom: '20px',
    paddingRight: '10px',
    width: '500px',
    marginLeft: '10px'
  },
  iconButtonActive: {
    marginLeft: '0px',

  },
  iconButton: {
    backgroundColor: '#E3E3E3',
    marginLeft: '0px',
  },
  svgIcon: {
    height: '0.8em'
  },
  switchFormGroupSupplier: {
    margin: '0px !important',
    paddingRight: '15px',
  },
  popper: {
    zIndex: '500'
  },
  paper: {
    zIndex: '500'
  },
  savePrintPaper: {
    width: '30em'
  },
  savePrintPadding: {
    padding: '1rem',
    paddingRight: 0
  },
  printButton: {
    width: '4em',
    textAlign: 'center'
  },
  savePrintTypo: {
    textAlign: 'center'
  },

  saveButton: {
    padding: '27px',
    paddingTop: '37px',
    marginLeft: '2em'
  },
  saveButtonImg: {
    width: '3em',
    height: '2.4em'
  },
  saveImage: {
    width: 134
  },
  root: {
    paddingLeft: '2px',
    paddingRight: '1px'
  },
  actions: {
    margin: '5px 1px 7px auto'
  },
  title: {
    flex: '0 0 auto',
    display: 'table',
    padding: '.5rem .6rem'
  },
  menuLink: {
    textDecoration: 'none',
    color: '#424242'
  },
  iconWrapper: {
    marginLeft: '25px'
  },
  ExportIcon: {
    height: '1.2rem',
    width: '1.2rem',
  },
  approveProducts: {
    width: '25rem'
  },
  searchIcon: {
    width: '20px'
  }
};

export const searchStyles = theme => ({
  main: {
    display: 'inline-flex',
    minWidth: '600px'
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginTop: '4px'
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main
    }
  },
  loaderIcon: {
    color: '#868686',
    width: '1.2rem',
    marginTop: '6px',
    marginLeft: '6px'
  }
});

export const TableHeaderStyles = {
  headerWrapper: {
    top: ' 0px',
    left: '0px',
    color: '#424242',
    zIndex: '100',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3',
    whiteSpace: 'nowrap',
    padding: '8px 35px 8px 24px'
  },
  checkbox: {
    backgroundColor: '#E3E3E3'
  }
};

export const TableStyles = {
  root: {
    width: '100%',
    borderRadius: '2px',
    margin: '5px 0px',
    fontSize: '1rem'
  },
  paper: {
    width: '100%',
  },
  popperWrapper: {
    width: '400px',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
    color: '#424242',
  },
  orderName: {
    textDecoration: 'underline',
    minWidth: '300px',
    color: '#702632',
  },
  tableCell: {
    color: '#424242',
  },
  name: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
  },
  globalUpc: {
    whiteSpace: 'nowrap',
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
  },
  input: {
    padding: '20px',
    height: '8px',
    maxWidth: '80px',
  },
  select: {
    '& .MuiFilledInput-input': {
      background: 'none',
      padding: '0px',
    },
    padding: '15px 20px',
    minWidth: '350px'
  },
  orderTableCell: {
    padding: '8px 35px 8px 24px',
  },
};

export const productCardStyles = {
  card: {
    minWidth: 300,
    maxWidth: 400
  },
  icon: {
    marginRight: '1px',
    marginLeft: 'auto',
    color: 'rgb(66, 66, 66)'
  },
  chip: {
    backgroundColor: 'rgb(66, 66, 66)',
    color: 'white',
    height: '26px'
  },
  productImage: {
    height: '100px'
  },
  wrapper: {
    display: 'inline-flex'
  },
  description: {
    minWidth: '200px'
  }
};

export const ProposedProductStyles = {
  root: {
    maxWidth: '100%',
  },
  loader: {
    width: '23rem',
    height: '5rem',
    maxWidth: '100%',
  },
  primaryText: {
    fontWeight: 600,
    paddingBottom: '.3rem'
  },
  noProposedEdit: {
    paddingLeft: '80px',
    paddingRight: '80px'
  },
  noProposedEditWrapper: {
    height: '40px',
    position: 'relative',
    top: '10px'
  },
  listWrapper: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.8125rem',
    opacity: '0.5'
  },
  scrollWrapper: {
    overflowY: 'scroll',
    height: '400px'
  },
  inline: {
    display: 'inline'
  },
  batchIds: {
    display: 'inline',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  approveIcon: {
    width: '1rem'
  },
  clearIcon: {
    width: '1.2rem',
    color: '#A8A8A8'
  },
  approveButton: {
    padding: '.1rem .4rem',
  },
  clearButton: {
    padding: '.1rem .3rem',
    marginLeft: '1.2rem'
  },
  iconWrapper: {
    padding: '1.6rem 0',
    maxHeight: '80.8px'
  },
  itemText: {
    padding: 0
  }
};

export const SelectToolBarStyles = {
  iconButton: {
    marginLeft: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative'
  },
  icon: {
    color: '#000'
  },
  inverseIcon: {
    transform: 'rotate(90deg)'
  },
  wrapper: {
    float: 'right'
  }
};

export default stockControlStyles;
