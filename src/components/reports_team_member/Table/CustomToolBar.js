import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import refreshlogo from '../../../assets/images/reports/refresh.png';
import exportlogo from '../../../assets/images/reports/export.png';
import CustomTableSearchField from '../../shared/customTableSearchField';
import { TeamMemberReportsToolBarStyles } from '../../../assets/styles/reports/teamMemberReportStyles';
import { CustomIconButton } from '../../stock_control/utils/utils';
import { CalenderIcon, ResetIcon, SearchIcon } from '../../../assets/SvgIcons/sellScreenSvgs';
import {
  Tooltip, Typography, IconButton, Grid, Button
} from '@material-ui/core';
import { addDays } from 'date-fns';

import DateTimePopper from '../../sell/salesHistory/dateTimePopper';
import SavePrintPopper from '../../shared/savePrintPopper';

import moment from 'moment';

import reportsActionTypes from '../../../providers/reducers/reports/reportsTypes';

import SavePrintTypes from '../../../providers/reducers/savePrint/savePrintTypes';

import { StateContext } from '../../../providers/stateProvider';

export class CustomToolBar extends Component {
  state = {
    open: false,
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
    datePicker: null,
    dateTimeAnchorEl: '',
  }

  handleDateTimePopperToggle = (event) => {
    const { currentTarget } = event;
    const { open } = this.state;
    this.setState({
      open: !open,
      dateTimeAnchorEl: currentTarget,
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
      type: reportsActionTypes.SET_REPORTS_STATE,
      payload: { startDate, endDate }
    });
    this.setState({ open: false });
  };

  handleResetTable = () => {
    const startDate = moment().set({
      hour: 6, minute: 0, second: 0, millisecond: 0
    });
    
    const endDate = moment().set({
      hour: 23, minute: 59, second: 59, millisecond: 0
    });

    const [, dispatch] = Object.values(this.context);

    dispatch({
      type: reportsActionTypes.SET_REPORTS_STATE,
      payload: { startDate, endDate }
    });
    this.setState({ open: false });
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
      handleTextChange,
      state: { searchText },
      classes,
      componentRef
    } = this.props;

    return (
      <Fragment>
        <Grid
          item
          xs={6}
          container
          justify="flex-end"
        >
          <Tooltip title="Search">
            <IconButton 
              // onClick={searchPopperToggle}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Custom Filter">
            <IconButton
              style={{
                marginLeft: '1.5em'
              }}
              // className={classes.iconButton}
              onClick={this.handleDateTimePopperToggle}
            >
              <CalenderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Table">
            <IconButton 
              style={{
                marginLeft: '1.5em',
                marginRight: '1.5em'
              }}
              onClick={this.handleResetTable}
            >
              <img src={refreshlogo} style={{ width: '20px' }} alt="add Product" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export List">
            <IconButton 
              onClick={this.handleSavePrintOpen}
            >
              <img src={exportlogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </Tooltip>
        </Grid>

        <DateTimePopper
          state={this.state}
          classes={classes}
          handleClose={this.handleClose}
          handleRangeChange={this.handleRangeChange}
          timeChangeHandler={this.timeChangeHandler}
          handleSliderButtons={this.handleSliderButtons}
          handleDateTimeDoneButton={this.handleDateTimeDoneButton}
        />

        <SavePrintPopper
          state={this.state}
          fileName="healthID_reports.pdf"
          componentRef={componentRef}
        />
      </Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object),
};

CustomToolBar.defaultProps = {
  state: {}
};

export default withStyles(TeamMemberReportsToolBarStyles)(CustomToolBar);
