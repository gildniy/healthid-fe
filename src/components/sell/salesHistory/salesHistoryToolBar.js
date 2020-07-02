import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns';
import { SalesToolBarStyles } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import Toolbar from './toolbar';
import DateTimePopper from './dateTimePopper';
import SearchPopper from './searchPopper';
import SavePrintPopper from '../../shared/savePrintPopper';
import SavePrintTypes from '../../../providers/reducers/savePrint/savePrintTypes';
import saleHistoryActionTypes from '../../../providers/reducers/saleHistory/saleHistoryTypes';

import { StateContext } from '../../../providers/stateProvider';

export class SalesHistoryToolBar extends Component {
  state = {
    open: false,
    isSearching: false,
    dateTimeAnchorEl: null,
    dateRangePicker: {
      selection: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
        color: '#7D7A1F',
      },
    },
    timeValue: {
      start: '00:00',
      end: '23:59'
    },
    searchValues: {
      searchField: '',
      from: new Date(),
      to: new Date(),
    },
    searchAnchorEl: null,
    searchPopperOpen: false,
    calenderPopperOpen: false,
    calenderAnchorEl: '',
    datePicker: null,
  };

  handleToggle = (event) => {
    const { currentTarget } = event;
    const { open } = this.state;
    this.setState({
      open: !open,
      dateTimeAnchorEl: currentTarget,
    });
  };

  searchPopperToggle = (event) => {
    const { currentTarget } = event;
    this.setState({
      searchPopperOpen: true,
      searchAnchorEl: currentTarget,
    });
  }

  handleClose = (which) => {
    this.setState({
      open: false,
      [which]: false,
    });
  };

  handleRangeChange = (which, payload) => {
    this.setState(prevState => ({
      [which]: {
        ...prevState[which],
        ...payload,
      },
    }));
  }

  handleCalenderChange = (which, payload) => {
    this.setState({
      [which]: payload,
    });
  }

  timeChangeHandler = (time) => {
    this.setState({
      timeValue: time
    });
  }

  handleSliderButtons = (point) => {
    if (point === '00:00') {
      this.setState(state => ({
        timeValue: {
          ...state.timeValue,
          start: point
        }
      }));
    } else {
      this.setState(state => ({
        timeValue: {
          ...state.timeValue,
          end: point
        }
      }));
    }
  }

  handleClickShowCalender = (event) => {
    const { currentTarget } = event;
    this.setState(state => ({
      calenderPopperOpen: !state.calenderPopperOpen,
      calenderAnchorEl: currentTarget,
    }));
  }

  handleSearchInput = (event) => {
    const { target: { value } } = event;
    this.setState(state => ({
      searchValues: {
        ...state.searchValues,
        searchField: value
      }
    }));
  }

  handleSearchChange = (which, data) => {
    this.setState(state => ({
      searchValues: {
        ...state.searchValues,
        [which]: data
      }
    }));
  }

  handleDoneButton = (searchValues) => {
    const [, dispatch] = Object.values(this.context);
    const {
      from: startDate,
      to: endDate,
      searchField: search
    } = searchValues;
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: { startDate, endDate, search }
    });
    this.setState({ searchPopperOpen: false });
  };

  handleDateTimeDoneButton = (selection, timeValue) => {
    const [, dispatch] = Object.values(this.context);
    const { startDate, endDate } = selection;
    const { start, end } = timeValue;
    const startTime = start.split(':');
    const endTime = end.split(':');
    startDate.setHours(startTime[0], startTime[1]);
    endDate.setHours(endTime[0], endTime[1]);
    const search = '';

    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: { startDate, endDate, search }
    });
    this.setState({ open: false });
  };

  setOutlets = (rows) => {
    const outlets = rows.map(row => row.location.split('|')[0]);
    return [...new Set(outlets)];
  }

  handleSavePrintOpen = ({ currentTarget }) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: SavePrintTypes.TOGGLE_POPPER_OPEN,
      payload: currentTarget
    });
  };

  static contextType = StateContext;

  render() {
    const {
      classes, title, rows, componentRef, handleResetSales
    } = this.props;
    return (
      <>
        <Toolbar
          classes={classes}
          title={title}
          handleResetSales={handleResetSales}
          searchPopperToggle={this.searchPopperToggle}
          handleSavePrintOpen={this.handleSavePrintOpen}
          handleToggle={this.handleToggle}
        />
        <DateTimePopper
          state={this.state}
          classes={classes}
          handleClose={this.handleClose}
          handleRangeChange={this.handleRangeChange}
          timeChangeHandler={this.timeChangeHandler}
          handleSliderButtons={this.handleSliderButtons}
          handleDateTimeDoneButton={this.handleDateTimeDoneButton}
        />
        <SearchPopper
          state={this.state}
          classes={classes}
          rows={this.setOutlets(rows)}
          handleClose={this.handleClose}
          handleSearchChange={this.handleSearchChange}
          handleSearchInput={this.handleSearchInput}
          handleDoneButton={this.handleDoneButton}
        />
        <SavePrintPopper
          state={this.state}
          fileName="healthID_sales.pdf"
          componentRef={componentRef}
        />
      </>
    );
  }
}

SalesHistoryToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  rows: PropTypes.instanceOf(Array),
  handleResetSales: PropTypes.func.isRequired,
  componentRef: PropTypes.instanceOf(Object),
};

SalesHistoryToolBar.defaultProps = {
  classes: {},
  title: '',
  rows: [],
  componentRef: {},
};

export default withStyles(SalesToolBarStyles)(SalesHistoryToolBar);
