import { createMuiTheme } from '@material-ui/core/styles';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FAF33E',
    },
    secondary: {
      main: '#424242'
    },
    error: {
      main: '#FF4141'
    },
    text: {
      primary: '#424242',
      secondary: '#0000'
    }
  },
  typography: {
    fontFamily: [
      'Avenir',
      'medium',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '8px 56px 8px 24px',
        fontSize: '.75rem',
        lineHeight: '1.5rem'
      },
      head: {
        lineHeight: '2.5rem'
      }
    },
    MuiFormLabel: {
      root: {
        color: 'none'
      }
    },
    MuiRadio: {
      root: {
        color: 'none'
      }
    },
    MuiCheckbox: {
      root: {
        color: 'none'
      }
    },
  }
});

export default AppTheme;
