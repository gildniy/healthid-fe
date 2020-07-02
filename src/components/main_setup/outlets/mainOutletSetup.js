import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Tooltip
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import withAuth from '../../withAuth';
import {
  MainOutletSetupStyles,
  SetupHeader
} from '../../../assets/styles/setup';
import {
  Add,
  Next,
  Previous,
  PreviousDisabled,
  NextDisabled
} from '../../../assets/SvgIcons/sellScreenSvgs';
import MainOutletSetupList from './mainOutletSetupList';
import MainOutletSetupForm from './mainOutletSetupForm';

import { StateContext } from '../../../providers/stateProvider';

class MainOutletSetup extends Component {
  state = {
    listView: true,
    currentPage: 1,
    outletsPerPage: 8
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }));
  };

  handlePrevious = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1
    }));
  };

  static contextType = StateContext;

  render() {
    const { session, outlets } = this.props;
    const { listView } = this.state;
    const {
      role: { name: role }
    } = session.me;
    const { currentPage, outletsPerPage } = this.state;
    const indexOfLast = currentPage * outletsPerPage;
    const indexOfFirst = indexOfLast - outletsPerPage;
    const currentOultets = outlets.slice(indexOfFirst, indexOfLast);
    const lastPage = Math.ceil(outlets.length / outletsPerPage);

    const isAdmin = role === 'Master Admin';

    return (
      <Fragment>
        <Grid container style={SetupHeader.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/main_setup" style={SetupHeader.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={MainOutletSetupStyles.header}>
              <Typography variant="h5">Back</Typography>
            </Grid>
            <Paper elevation={2}>
              <Grid
                container
                item
                style={MainOutletSetupStyles.formTitle}
                justify="space-between"
              >
                <Typography style={MainOutletSetupStyles.add}>
                  {`${outlets.length} Outlets`}
                </Typography>
                {isAdmin ? (
                  <Tooltip title="Add Outlet">
                    <Link
                      to="/main_setup/outlets_registers/new"
                      style={MainOutletSetupStyles.addLink}
                    >
                      <IconButton>
                        <Add style={MainOutletSetupStyles.addIcon} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                ) : null}
              </Grid>
              <Divider />
              <Grid item xs={11} style={MainOutletSetupStyles.tableBox}>
                {listView ? (
                  <MainOutletSetupList outletsList={currentOultets} />
                ) : (
                  <MainOutletSetupForm />
                )}
              </Grid>
              <Grid
                container
                style={MainOutletSetupStyles.paginate}
                justify="flex-end"
              >
                <Typography
                  variant="body1"
                  style={MainOutletSetupStyles.paginateText}
                >
                  {indexOfFirst + 1}
                  {'-'}
                  {indexOfLast >= outlets.length
                    ? outlets.length
                    : indexOfLast}
                  {' '}
                  of
                  {' '}
                  {outlets.length}
                </Typography>
                <IconButton
                  style={MainOutletSetupStyles.paginateArrow}
                  onClick={this.handlePrevious}
                  disabled={currentPage === 1}
                >
                  {currentPage !== 1 ? (
                    <Previous style={MainOutletSetupStyles.previous} />
                  ) : (
                    <PreviousDisabled style={MainOutletSetupStyles.previous} />
                  )}
                </IconButton>
                <Typography style={MainOutletSetupStyles.spacing} />
                <IconButton
                  disabled={currentPage === lastPage}
                  style={MainOutletSetupStyles.paginateArrow}
                  onClick={this.handleNext}
                >
                  {currentPage !== lastPage ? <Next /> : <NextDisabled />}
                </IconButton>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

MainOutletSetup.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      businesses: PropTypes.array,
      outlets: PropTypes.array,
      role: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }).isRequired,
  outlets: PropTypes.instanceOf(Object).isRequired
};

export default withAuth(MainOutletSetup);
