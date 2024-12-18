export const comingSoonStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 280
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 2.4em'
  },
  arrowButtonGrid: {
    position: 'relative',
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2))]: {
      width: '72%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

export default comingSoonStyles;
