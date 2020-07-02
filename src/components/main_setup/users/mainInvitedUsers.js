import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Grid, Button, Typography, Paper
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';
import withAuth from '../../withAuth';
import {
  MainOutletSetupStyles,
  SetupHeader
} from '../../../assets/styles/setup';
import MainInvitedUsersList from './mainInvitedUsersList';
import { useStateValue } from '../../../providers/stateProvider';
import addlogo from '../../../assets/images/products/add.png';
import { CustomIconButton } from '../../stock_control/utils/utils';
import Footer from '../../shared/Footer';

const MainInvitedUsers = ({ session, history }) => {
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }, []);

  const {
    me: {
      role: { name: role }
    }
  } = session;
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
            <Grid container xs={12} style={MainOutletSetupStyles.formHeader}>
              <Grid item xs={11}>
                <Typography variant="h6" style={MainOutletSetupStyles.formUserTitle}>
                  USERS
                </Typography>
              </Grid>
              {isAdmin ? (
                <Grid
                  item
                  xs={1}
                  style={MainOutletSetupStyles.addButtonContainer}
                >
                  <CustomIconButton
                    toolTip="Add User"
                    onClickHandler={() => history.push('/main_setup/add_user')}
                  >
                    <img src={addlogo} style={{ width: '25px' }} alt="" />
                  </CustomIconButton>
                </Grid>
              ) : null}
            </Grid>
            <hr />
            <Grid item xs={11} style={MainOutletSetupStyles.tableBox}>
              <MainInvitedUsersList role={role} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Fragment>
  );
};

MainInvitedUsers.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      role: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }),
  history: PropTypes.func
};

MainInvitedUsers.defaultProps = {
  session: {
    me: {
      role: {
        name: ''
      }
    }
  },
  history: () => {}
};

export default withAuth(withRouter(MainInvitedUsers));
