import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Grid, ListItemAvatar, Paper, Popper,
  Tooltip, Typography, List, ListItem, ListItemText,
  IconButton, MenuItem, Menu
} from '@material-ui/core';
import moment from 'moment-timezone';
import { Mutation, Query } from 'react-apollo';
import {
  CalenderIcon2, Notification, Register, User, Online, Offline
} from '../../../assets/SvgIcons/sellScreenSvgs';
import lowerNavbarStyles from '../../../assets/styles/navbar/lowerNavbarStyles';
import SwitchAccount from '../../authentication/SwitchAcount';
import OfflineStoragePopper from './offlineStoragePopper';
import { GET_USER_OUTLETS } from '../../../queries/userDataQuery';
import {
  CHANGE_DEFAULT_OUTLET_MUTATION
} from '../../authentication/mutations/mutations';

import outletsRegistersIcon
  from '../../../assets/images/Setup_Icons/Outlets_Registers.png';
import activeOutletIcon
  from '../../../assets/images/Setup_Icons/Active_Outlet_Green.png';
import notify from '../Toaster';

import Loader from '../Loader';

const styles = lowerNavbarStyles;

const LowerNavbar = ({
  activeOutlet, username, open, anchorEl, handleMenu,
  handleClose, handleLogOut, currentUserRole, offline
}) => {
  const outletName = activeOutlet && activeOutlet.name;
  const cityName = activeOutlet && activeOutlet.city.name;
  const [IsOpen, setOpen] = useState(false);

  const getDateTime = () => {
    const today = moment(new Date());
    const dateTime = {
      date: today.format('ddd Do MMM'),
      time: today.format('HH:mm')
    };
    return dateTime;
  };
  const [now, setNow] = useState(getDateTime());
  const [offlineEl, setOfflineEl] = useState(null);

  useEffect(() => {
    // Regularly set time in state
    const intervalId = setInterval(
      () => setNow(getDateTime()),
      1000,
    );
    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [setInterval, clearInterval, setNow, getDateTime]);

  const showSwitchAccount = () => {
    setOpen(!IsOpen);
    handleClose();
  };

  const handleOfflineClick = (event) => {
    setOfflineEl(offlineEl ? null : event.currentTarget);
  };

  const [outletsAnchorEl, setOutletsAnchorEl] = React.useState(null);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [outlets, setOutlets] = React.useState([]);

  const handleChangeOutletClick = (event, changeOutlet, outletId) => {
    event.preventDefault();

    changeOutlet({
      variables: {
        outlet_id: outletId
      }
    })
      .then((result) => {
        const {
          data: {
            changeUserDefaultOutlet: {
              defaultOutlet: {
                name
              }
            }
          }
        } = result;

        if (name) {
          notify('Default Outlet changed successfully.');
          window.location.reload(false);
        }
      })
      .catch(() => {
        notify('Action to change default outlet failed.');
      });
  };

  const handleOutletClick = (event) => {
    setOutletsAnchorEl(outletsAnchorEl ? null : event.currentTarget);
  };

  const openOutletsPopper = Boolean(outletsAnchorEl);
  const id = openOutletsPopper ? 'simple-popper' : undefined;

  return (
    <div>
      <Grid container justify="center" style={styles.gridContainer}>
        <Query
          query={GET_USER_OUTLETS}
        >
          {
            ({ loading, error, data }) => {
              if (loading) {
                return <Loader size={30} />;
              }

              setOutlets(data.me.outlets);

              return null;
            }
          }
        </Query>
        <Grid item xs={4} style={styles.timeGrid}>
          <Typography variant="inherit">
            {now.date}
            &emsp;
            {now.time}
          </Typography>
        </Grid>
        <Grid item xs={4} align="center" style={styles.timeGrid}>
          <div
            style={{
              cursor: 'pointer',
            }}
            aria-describedby={id}
            type="button"
            onClick={currentUserRole === 'Master Admin' ? handleOutletClick : null}
          >
            <Typography variant="inherit">
              {`${outletName}, ${cityName}`}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4} align="right" style={styles.iconsGrid}>
          <IconButton style={styles.gridButton} onClick={handleOfflineClick}>
            {offline
              ? <Offline style={styles.gridIcon} />
              : <Online style={styles.gridIcon} />
            }
          </IconButton>
          <IconButton style={styles.gridButton}>
            <Register style={styles.gridIcon} />
          </IconButton>
          <IconButton style={styles.gridButton}>
            <CalenderIcon2 style={styles.gridIcon} />
          </IconButton>
          <IconButton style={styles.gridButton}>
            <Notification style={styles.gridIcon} />
          </IconButton>
          <Tooltip
            title={<Typography color="inherit">{`${username}`}</Typography>}
          >
            <IconButton style={styles.gridButton} onClick={handleMenu}>
              <User style={styles.gridIcon} />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={styles.menuStyles}
            transformOrigin={styles.menuStyles}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuItem onClick={() => showSwitchAccount()}>Switch Account</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <SwitchAccount
        open={IsOpen}
        handleClose={() => setOpen(false)}
        anchorEl={anchorEl}
      />

      <Popper
        id={id}
        open={openOutletsPopper}
        anchorEl={outletsAnchorEl}
        transition
        style={{
          zIndex: 10000,
          marginTop: 10,
          width: 467
        }}
      >
        <Mutation mutation={CHANGE_DEFAULT_OUTLET_MUTATION}>
          {
            changeOutlet => (
              <Paper>
                <div style={{
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 20
                }}
                >
                  <Typography style={{
                    fontSize: 20
                  }}
                  >
                    Switch Outlet

                  </Typography>
                </div>
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  style={{
                    backgroundColor: '#e8e8e8',
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  {
                    outlets.map((outlet) => {
                      const isActiveOutlet = outlet.id === activeOutlet.id;
                      return (
                        <ListItem
                          button
                          selected={selectedIndex === 0}
                          onClick={event => handleChangeOutletClick(event, changeOutlet, outlet.id)}
                        >
                          {
                            isActiveOutlet ? (
                              <div style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '16px'
                              }}
                              >
                                <img
                                  src={activeOutletIcon}
                                  style={{
                                    width: '55%',
                                    height: '55%'
                                  }}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={outletsRegistersIcon} />
                              </ListItemAvatar>
                            )
                          }

                          <ListItemText
                            primary={(
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                style={{
                                  fontSize: 13,
                                  color: '#4D4F5C',
                                  fontWeight: 'bold'
                                }}
                              >
                                {outlet.name}
                              </Typography>
                            )}
                            secondary={(
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                  style={{
                                    fontSize: 11,
                                    color: '#4D4F5C',
                                    opacity: 0.5
                                  }}
                                >
                                  {`${outlet.city.name}, ${outlet.city.country.name}`}
                                </Typography>
                              </React.Fragment>
                            )}
                          />

                          <div style={{
                            marginLeft: 50,
                            width: 60,
                            height: 25,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: isActiveOutlet ? '1.5px solid #3CC480' : '1.5px solid #424242',
                            borderRadius: 5,
                            fontSize: 12,
                            color: isActiveOutlet ? '#3CC480' : '#424242'
                          }}
                          >
                            ID
                            {' '}
                            {outlet.id}
                          </div>
                        </ListItem>
                      );
                    })
                  }
                </List>
              </Paper>
            )
          }
        </Mutation>
      </Popper>
      <OfflineStoragePopper
        offlineEl={offlineEl}
        handleOfflineClick={handleOfflineClick}
      />
    </div>
  );
};

LowerNavbar.propTypes = {
  username: PropTypes.string,
  currentUserRole: PropTypes.string,
  open: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  activeOutlet: PropTypes.instanceOf(Object),
  handleMenu: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  offline: PropTypes.bool,
};

LowerNavbar.defaultProps = {
  username: '',
  currentUserRole: '',
  open: false,
  anchorEl: '',
  activeOutlet: {},
  offline: false,
};

export default LowerNavbar;
