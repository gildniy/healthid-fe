/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// MATERIAL UI COMPONENTS
import { Grid, Paper, List } from '@material-ui/core';

// IMAGES AND ICONS
import userAccountIcon from '../../assets/images/Setup_Icons/user_account.png';
import businessInformationIcon from '../../assets/images/Setup_Icons/Business_Information.png';
import outletsRegistersIcon from '../../assets/images/Setup_Icons/Outlets_Registers.png';
import UsersIcon from '../../assets/images/Setup_Icons/Users.png';

// SHARED COMPONENTS
import withAuth from '../withAuth';
import { MainSetupStyles as styles } from '../../assets/styles/setup';
import { useStateValue } from '../../providers/stateProvider';
import MenuItem from './menuItem';

export const MainSetup = ({ session }) => {
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }, []);

  const [active, setActive] = useState(null);

  const toggleActive = (menuItem) => {
    if (menuItem) {
      return setActive(menuItem);
    }
    return setActive(null);
  };

  const {
    me: {
      role: { name: role }
    }
  } = session;

  const isAdmin = role === 'Master Admin';

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={10} style={styles.container}>
          <Paper elevation={2} style={styles.paper}>
            <Grid item xs={10} style={styles.menu}>
              <List>
                <MenuItem
                  id="account"
                  title="My Account"
                  description="View & edit your personal information"
                  icon={userAccountIcon}
                  link="/main_setup/profile"
                  active={active}
                  toggleActive={toggleActive}
                />
                <MenuItem
                  id="business"
                  title="Business Information"
                  description={`View${
                    isAdmin ? ' & edit' : ''
                  } information about your business`}
                  icon={businessInformationIcon}
                  link="main_setup/business_information"
                  active={active}
                  toggleActive={toggleActive}
                />
                <MenuItem
                  id="outlets"
                  title="Outlets & Registers"
                  description={`View${
                    isAdmin ? ' & edit' : ''
                  } information about your outlets`}
                  icon={outletsRegistersIcon}
                  link="/main_setup/outlets_registers"
                  active={active}
                  toggleActive={toggleActive}
                />
                <MenuItem
                  id="users"
                  title="Users"
                  description={
                    isAdmin
                      ? 'Manage store team members and their assigned outlets'
                      : 'View your store team members'
                  }
                  icon={UsersIcon}
                  link="/main_setup/users"
                  active={active}
                  toggleActive={toggleActive}
                  last
                />
              </List>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

MainSetup.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      username: PropTypes.string,
      profileImage: PropTypes.string,
      role: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }).isRequired
};

export default withAuth(MainSetup);
