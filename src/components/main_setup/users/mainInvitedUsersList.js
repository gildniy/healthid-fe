import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import User from './usersLists';
import { MainInvitedUsersStyles } from '../../../assets/styles/setup';
import { GET_OUTLETS } from '../../../queries/addUsersSetupQuery';

const MainInvitedUsersList = (props) => {
  const {
    assignedOutlets: {
      business
    },
    role
  } = props;

  const data = business !== undefined ? business.outletSet.map(outlet => (
    <Grid key={outlet.id} style={MainInvitedUsersStyles.category}>
      <Typography variant="h6">
        {outlet.name}
      </Typography>
      <User data={outlet.users} role={role} />
    </Grid>
  ))
    : (
      <Typography variant="h6">
        ...
      </Typography>
    );
  return (
    <div>
      { data }
    </div>

  );
};
MainInvitedUsersList.propTypes = {
  assignedOutlets: PropTypes.shape({
    business: PropTypes.shape({
      outletSet: PropTypes.shape([])
    })
  }).isRequired,
  role: PropTypes.string.isRequired
};

const GET_ASSIGNED_OUTLETS = graphql(GET_OUTLETS, {
  name: 'assignedOutlets',
  options: {
    variables: {
      id: localStorage.businessId
    }
  }
});

export default compose(GET_ASSIGNED_OUTLETS)(MainInvitedUsersList);
