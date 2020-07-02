const lowerDashboardStyles = {
  gridContainer: {
    backgroundColor: '#A3A3A3',
  },
  timeGrid: {
    padding: '0.47em 2em',
    borderRight: '1px solid #888787',
  },
  typographyText: {
    justifyContent: 'flex-start',
    paddingLeft: '2em',
    paddingTop: '0.8em',
    color: 'black'
  },
  iconsGrid: {
    padding: '1px 20px'
  },
  gridButton: {
    padding: '8px',
    marginLeft: '1.5em'
  },
  gridIcon: {
    width: '0.8em',
    height: '0.8em',
  },
  gridIconCard: {
    width: '0.6em',
    height: '0.6em',
    marginRight: '5px',
  },
  gridOutlets: {
    marginTop: '10px',
    paddingTop: '3%',
    paddingBottom: '3%',
    fontSize: '0.7em',
    '&:hover': {
      background: 'red',
    },
  },
  gridPrefences: {
    width: '0.6em',
    height: '0.6em',
    float: 'right',
  },
  gridPrefenceBox: {
    width: '100%',
  },
  gridPaper: {
    borderColor: '#DA1B1E',
    boxShadow: 'none',
    padding: '0.8rem',
    paddingTop: '0px',
    marginRight: '0.8rem',
    paddingBottom: '0.4rem',
  },
  gridTitleSize: {
    fontSize: '1.8em',
    fontWeight: '500',
    marginBottom: '1.4em',
    marginTop: '0.8em',
    width: '12rem',
    textOverflow: 'ellipsis',
  },
  gridTextSize: {
    fontSize: '1.3em',
    color: '#A3A3A3',
  },
  gridIconText: {
    display: 'flex',
    paddingRight: '5px',
    paddingLeft: '5px',
    margingBottom: '0px',
    lineHeight: '0',
    float: 'right',
    boxShadow: 'none',
    fontSize: '0.8em',
  },
  gridIconNum: {
    fontSize: '1em',
    color: '#A3A3A3',
    marginLeft: '3px',
  },
  gridFooter: {
    textTransform: 'capitalize',
    fontSize: '1.3em',
    color: '#A3A3A3',
    marginTop: '15px',
  },
  paperBox: {
    padding: '10px',
    paddingTop: '0.1em',
    paddingRight: '0.1em',
    border: '0.5px solid rgb(250, 243, 62, .3)',
    boxShadow: '1px 2px 3px #00000040',
    borderRadius: '0px',
    hover: 'cursor',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  gridPrefenceBtn: {
    float: 'right',
    padding: '0.4em',
  },
  menuStyles: {
    vertical: 'top',
    horizontal: 'right',
  },
  loginText: {
    fontWeight: '50',
    paddingTop: '0.8em'
  }
};

export const offlineStyles = {
  GridWrapper: {
    width: '36vw'
  },
  headerWrapper: {
    padding: '.5rem 2rem',
    borderBottom: '1px solid #D2D0D0'
  },
  buttonSection: {
    backgroundColor: '#E8E8E8',
    padding: '2rem',
    textAlign: 'center'
  },
  button: {
    textTransform: 'capitalize',
    width: '11.1rem',
    color: '#6d6c6c',
    padding: '.1rem 2rem',
    border: '2px solid #929292',
    borderRadius: '5px'
  },
  buttonTypo: {
    fontWeight: 500,
  },
  optionsSection: {
    backgroundColor: '#CCCCCC',
    padding: '1rem 4rem',
    textAlign: 'center'
  },
  labelHeader: {
    fontWeight: 500,
    color: '#43425D'
  },
  labelOption: {
    fontWeight: 300,
    color: '#43425D'
  },
  labelTinyOption: {
    fontStyle: 'oblique',
    color: '#707070',
    marginLeft: '1rem',
    fontSize: '0.7rem',
  },
  checkboxContainer: {
    paddingTop: '1rem',
    '&:first-child': {
      paddingTop: 0
    }
  },
  checkbox: {
    padding: 0,
    paddingRight: '6px'
  }
};

export default lowerDashboardStyles;
