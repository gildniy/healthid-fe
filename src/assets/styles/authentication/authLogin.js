export const login = {
  container: {
    position: 'relative',
    backgroundImage: 'linear-gradient(#FAF33E, #7D7A1F)',
    height: '100vh',
    width: '100vw',
  },
  bkgImage: {
    height: '100vh',
    width: '60%',
  },
  wrapperGrid: {
    position: 'absolute',
    top: '9em',
    width: '100vw',
  },
  logo: {
    width: '50%',
    height: '50%',
    marginTop: '13em',
    marginLeft: '6em',
  },
  contentGrid: {
    flexBasis: '50%',
  },
  logoTypo: {
    color: '#E8E8E8',
    fontSize: '1.8rem',
    marginTop: '.5rem',
    marginLeft: '1rem'
  },
  contentPaper: {
    backgroundColor: '#424242',
    color: '#C3C3C3',
    width: '90%',
    margin: '0 auto',
    height: '32em',
    padding: '4em',
  },

  root: {
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #5C5C5C'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #757575'
    }
  }
};

export const register = {
  container: {
    position: 'relative',
    width: '100px',
    height: '100px',
  },
};
