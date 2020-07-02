import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Grow, Paper, Popper, Button, TextField, createMuiTheme
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // import
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../../assets/styles/salesHistory/dateTimePopper.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { dateTimeStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';


const calendarTheme = createMuiTheme({
  overrides: {
    MuiPickersDay: {
      day: {
        color: '#424242',
      },
      isSelected: {
        backgroundColor: '#FAF33E',
        color: '#424242',
        '&:hover': {
          color: '#FFFFFF',
          backgroundColor: '#424242',
        }
      },
      current: {
        color: '#FAF33E',
      },
    },
  },
});


export const SearchPopper = ({
  state,
  classes,
  handleClose,
  handleSearchChange,
  handleSearchInput,
  handleDoneButton,
}) => {
  const {
    searchAnchorEl,
    searchPopperOpen,
    searchValues
  } = state;

  return (
    <Fragment>
      <Popper
        open={searchPopperOpen}
        anchorEl={searchAnchorEl}
        className={classes.popper}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={2} className={classes.searchPaper}>
              <Grid container className={classes.timeGrid}>
                <Grid item container xs={12}>
                  <TextField
                    id="search-field"
                    name="searchField"
                    label="Search"
                    autoFocus
                    value={searchValues.searchField}
                    onChange={handleSearchInput}
                    className={classes.FormControl}
                    InputLabelProps={{ shrink: true }}
                  />
                  <MuiThemeProvider theme={calendarTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <InlineDatePicker
                        id="search-datepicker"
                        onlyCalendar
                        keyboard
                        clearable
                        fullWidth
                        disableFuture
                        label="From"
                        value={searchValues.from}
                        onChange={event => handleSearchChange('from', event)}
                        format="dd/MM/yyyy"
                        className={classes.FormControl}
                      />
                      <InlineDatePicker
                        onlyCalendar
                        keyboard
                        clearable
                        fullWidth
                        disableFuture
                        label="To"
                        value={searchValues.to}
                        onChange={event => handleSearchChange('to', event)}
                        format="dd/MM/yyyy"
                        className={classes.FormControl}
                      />
                    </MuiPickersUtilsProvider>
                  </MuiThemeProvider>
                </Grid>
                <Grid item container xs={12} style={dateTimeStyles.buttonsGrid}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    style={dateTimeStyles.mainButtons}
                    onClick={() => handleClose('searchPopperOpen')}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={dateTimeStyles.mainButtons}
                    onClick={() => handleDoneButton(searchValues)}
                  >
                    done
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

SearchPopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  rows: PropTypes.instanceOf(Array),
  handleClose: PropTypes.func.isRequired,
  handleDoneButton: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
};

SearchPopper.defaultProps = {
  state: {},
  classes: {},
  rows: [],
};

export default SearchPopper;
