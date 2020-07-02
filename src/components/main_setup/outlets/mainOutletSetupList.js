import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  Paper,
  Tooltip,
  IconButton
} from '@material-ui/core';
import {
  RegisterIcon,
  UserSvg,
  Preferences
} from '../../../assets/SvgIcons/sellScreenSvgs';
import lowerDashboardStyles from '../../../assets/styles/navbar/lowerNavbarStyles';

const styles = lowerDashboardStyles;

const MainOutletSetupList = (props) => {
  const { outletsList, history } = props;

  const redirect = (store) => {
    history.push(`/main_setup/outlets/${store.id}`);
  };

  return (
    <>
      <Grid
        container
        item
        spacing={5}
        style={styles.gridOutlets}
        alignContent="center"
      >
        {outletsList.map(store => (
          <Grid item xs={3} key={store.id} onClick={() => redirect(store)}>
            <Paper elevation={2} style={styles.paperBox}>
              <Grid component="div" style={styles.gridPrefenceBox}>
                <Tooltip title="Preferences">
                  <IconButton style={styles.gridPrefenceBtn}>
                    <Link to={`/main_setup/preferences/${store.id}`}>
                      <Preferences style={styles.gridPrefences} />
                    </Link>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Paper elevation={2} style={styles.gridPaper}>
                <Typography variant="h6" style={styles.gridTitleSize}>
                  {store.name}
                </Typography>
                <Typography variant="body1" style={styles.gridTextSize}>
                  {store.city ? store.city.name : ''}
                  {', '}
                  {store.city ? store.city.country.name : ''}
                </Typography>
                <Typography variant="body1" style={styles.gridTextSize}>
                  {' Launched '}
                  {store.outletmetaSet[0] && store.outletmetaSet[0].dataValue}
                </Typography>
                <Typography variant="body2" style={styles.gridFooter}>
                  {store.kind.name}
                  {store.kind.name !== 'warehouse' ? (
                    <Card
                      component="span"
                      display="inline"
                      style={styles.gridIconText}
                    >
                      <RegisterIcon style={styles.gridIconCard} />
                      <Typography component="span" style={styles.gridIconNum}>
                        {store.outletRegister.length}
                      </Typography>
                    </Card>
                  ) : (
                    ' '
                  )}
                  <Card
                    component="span"
                    display="inline"
                    style={styles.gridIconText}
                  >
                    <UserSvg style={styles.gridIconCard} />
                    <Typography component="span" style={styles.gridIconNum}>
                      {store.users.length}
                    </Typography>
                  </Card>
                </Typography>
              </Paper>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

MainOutletSetupList.propTypes = {
  outletsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(MainOutletSetupList);
