export const salesHistoryStyles = theme => ({
  paper: {
    width: '95%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    marginBottom: theme.spacing(6),
    paddingTop: '0.5em',
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: '0.5em',
    }
  },
  headerPaper: {
    width: '95%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  mainGrid: {
    margin: '.5rem 1.3em',
  },
  arrowIcon: {
    color: '#424242'
  },
  headerGrid: {
    padding: '1rem 0',
  },
  header: {
    fontWeight: 500
  },
  cardsGrid: {
    padding: '1.6rem 0.5rem',
  },
  arrows: {
    cursor: 'pointer',
    fontSize: '1.9rem'
  },
  leftArrowButton: {
    marginLeft: '10px'
  },
  rightArrowButton: {
    marginRight: '10px'
  },
  cardWrapper: {
    transform: 'translateX(0px)',
    transition: '500ms'
  },
  cardContainer: {
    overflow: 'hidden',
  },
  buttonsGrid: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

export const totalsCardStyles = () => ({
  paper: {
    width: '15rem',
    padding: '.5rem 1rem',
    border: '0.5px solid rgba(249, 240, 8, 0.6)',
  },
  salesTotals: {
    minWidth: '240px',
    marginRight: '25px',
    padding: '.5rem 1rem',
    border: '0.5px solid rgba(249, 240, 8, 0.6)',
  },
  totalsHeading: {
    color: '#A3A3A3',
    fontWeight: 600,
    paddingBottom: '.6rem'
  },
  totalsValue: {
    color: '#5A5A5A',
    fontSize: '1.2rem'
  },
});

export const SalesToolBarStyles = {
  toolbarWrapper: {
    padding: '1.5em',
    paddingTop: 0,
    paddingBottom: '0.5em',
  },
  paper: {
    backgroundColor: '#FFFFFF',
    paddingRight: '15px',
  },
  iconButton: {
    marginLeft: '1.5em',
    marginRight: '1.5em',
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
  popper: {
    zIndex: '500'
  },
  savePrintPaper: {
    width: '30em',
    padding: '1.5em',
    paddingRight: 0
  },
  printButton: {
    width: '4em',
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
  savePrintTypo: {
    textAlign: 'center'
  },
  exportSVG: {
    height: '0.8em',
  },
  timeTypo: {
    float: 'left',
    paddingTop: '5px'
  },
  timeSlider: {
    padding: '10px',
    paddingRight: '8px',
    paddingLeft: '14px',
    maxWidth: '82%'
  },
  innerSlider: {
    paddingLeft: '2.2em',
  },
  timeGrid: {
    padding: '1.5em',
    paddingRight: 0,
    paddingTop: '1em',
  },
  textField: {
    width: '30em',
    marginTop: 0,
    marginBottom: 0,
  },
  typo: {
    marginTop: '0.8em',
    marginRight: '0.8em',
  },
  searchPaper: {
    width: '30em',
    paddingRight: '20px',
  },
  FormControl: {
    width: '100%',
    marginTop: '1em',
    marginBottom: '1em',
  },
  calendar: {
    width: '20em'
  }
};

export const toolbarButton = {
  resetButton: {
    textTransform: 'capitalize',
    color: '#424242',
    maxHeight: '40px',
    paddingTop: '1px',
    paddingBottom: '1px',
    marginTop: '0.59em',
  },
  resetIcon: {
    padding: '4px',
    paddingLeft: 0,
    cursor: 'pointer',
    color: '#424242',
    marginBottom: '3px',
  },
  buttonsTypo: {
    fontWeight: 'bold',
  },
};

export const dateTimeStyles = {
  sliderFabStart: {
    height: '25px',
    width: '3.7em',
    marginTop: '3px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    background: 'linear-gradient(#FAF33E, #7D7A1F)'
  },
  sliderFabEnd: {
    height: '25px',
    width: '3.7em',
    marginTop: '3px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    background: 'linear-gradient(#FAF33E, #7D7A1F)'
  },
  buttonsGrid: {
    paddingTop: '1em',
    justifyContent: 'flex-end'
  },
  mainButtons: {
    borderRadius: '10px',
    minWidth: '84px',
    marginLeft: '20px'
  }
};

export const HeaderStyles = () => ({
  headerWrapper: {
    top: '0px',
    left: '0px',
    color: '#393939',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3'
  }
});

export const HeaderRowStyles = ({
  row: {
    height: '2.5em'
  }
});

export const pointer = {
  cursor: 'pointer'
};
