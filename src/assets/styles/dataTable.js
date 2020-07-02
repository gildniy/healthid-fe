// override for datatables
import { createMuiTheme } from '@material-ui/core/styles';

const DataTableOverride = createMuiTheme({
  palette: {
    primary: {
      main: '#FAF33E',
    },
    secondary: {
      main: '#424242',
    },
    error: {
      main: '#FF4141'
    }
  },
  typography: {
    fontFamily: [
      'Avenir',
      'medium',
      'Arial',
      'sans-serif'
    ].join(','),
    useNextVariants: true,
  },
  overrides: {
    MuiTableRow: {
      head: {
        height: '40px',
      },
      root: {
        cursor: 'pointer',
      }
    },
    MuiTableCell: {
      head: {
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }
    },
    MUIDataTableBodyCell: {
      root: {
        fontSize: '1em',
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#E3E3E3',
        fontWeight: '800',
        color: '#393939',
        fontSize: '1em',
      }
    },
    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: '#E3E3E3',
      },
      fixedHeader: {
        backgroundColor: 'white',
      }
    },
    MuiTypography: {
      h6: {
        fontSize: '1rem',
        textDecoration: 'bold'
      }
    },
    MuiSvgIcon: {
      root: {
        fill: '#757575',
        fontSize: '1.3em',
      }
    },
    MUIDataTableToolbar: {
      titleText: {
        fontSize: '1rem',
        fontWeight: '100',
        marginTop: '20px',
        marginBottom: '20px',
      }
    },
    SalesHistoryToolBar: {
      iconButton: {
        marginLeft: '1.5em',
      }
    },
  }
});

export default DataTableOverride;
