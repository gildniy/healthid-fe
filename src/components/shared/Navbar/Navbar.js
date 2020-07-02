import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import LowerNavbar from './LowerNavbar';
import logo from '../../../assets/images/PIQ Small Logo.png';
import navbarStyles from '../../../assets/styles/navbar/navbarStyles';
import SVGIcon from './Icons';
import NetworkStatus from '../networkStatus';

import { StateContext } from '../../../providers/stateProvider';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    const { isActive } = this.props;
    this.state = {
      anchorEl: null,
      isActive: isActive || 'grid1'
    };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogOut = () => {
    const { history } = this.props;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('rest_token');
    localStorage.removeItem('outletId');
    localStorage.removeItem('businessId');
    this.setState({ anchorEl: null, open: false });
    history.push('/');
  }

  handleOnClick = (event) => {
    const [, dispatch] = Object.values(this.context);
    const { isActive } = this.state;

    if (isActive) {
      this.setState({
        isActive: ''
      });
    }

    switch (event.currentTarget.id) {
    case 'grid1':
      dispatch({
        type: 'changeGrid',
        grid: 'grid1'
      });
      break;
    case 'grid2':
      dispatch({
        type: 'changeGrid',
        grid: 'grid2'
      });
      break;
    case 'grid3':
      dispatch({
        type: 'changeGrid',
        grid: 'grid3'
      });
      break;
    case 'grid4':
      dispatch({
        type: 'changeGrid',
        grid: 'grid4'
      });
      break;
    case 'grid5':
      dispatch({
        type: 'changeGrid',
        grid: 'grid5'
      });
      break;
    case 'grid6':
      dispatch({
        type: 'changeGrid',
        grid: 'grid6'
      });
      break;
    case 'grid7':
      dispatch({
        type: 'changeGrid',
        grid: 'grid7'
      });
      break;
    case 'grid8':
      dispatch({
        type: 'changeGrid',
        grid: 'grid8'
      });
      break;
    case 'grid9':
      dispatch({
        type: 'changeGrid',
        grid: 'grid9'
      });
      break;
    default:
      break;
    }
  }

  upperNavbar = (isActive) => {
    const styles = navbarStyles();

    const handleActiveGrid = (gridId) => {
      let style = styles.gridItem;
      if (isActive === gridId) {
        style = styles.activeGridItem;
      }
      return style;
    };

    const handleActiveText = (gridId) => {
      let style = styles.typographyText;
      if (isActive === gridId) {
        style = styles.ActiveTypographyText;
      }
      return style;
    };

    const handleActiveImage = (gridId) => {
      let fill = 'white';
      if (isActive === gridId) {
        fill = '';
      }
      return fill;
    };

    const renderGrid = (id, name, imagestyle, label, link) => (
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Grid
          item
          id={id}
          onClick={this.handleOnClick}
          style={handleActiveGrid(id)}
        >
          <div>
            <SVGIcon name={name} style={imagestyle} fill={handleActiveImage(id)} />
          </div>
          <Typography
            variant="overline"
            style={handleActiveText(id)}
          >
            {label}
          </Typography>
        </Grid>
      </Link>
    );

    return (
      <Grid container style={styles.appbar}>
        <Grid item>
          <img src={logo} alt="PharmIO logo" style={styles.logo} />
        </Grid>
        {renderGrid('grid1', 'Dashboard', styles.DashboardImg, 'Dashboard', '/dashboard')}
        {renderGrid('grid2', 'Sell', styles.innerImg, 'SELL', '/sell')}
        {renderGrid('grid3', 'Product', styles.productImg, 'PRODUCTS', '/products/approved')}
        {renderGrid('grid4', 'Suppliers', styles.suppliersImg, 'ORDERS & SUPPLIERS', '/orders/pending-delivery')}
        {renderGrid('grid5', 'Cash', styles.cashImg, 'CASH & FINANCES', '/comingsoon')}
        {renderGrid('grid6', 'Report', styles.ReportImg, 'REPORT', '/reports/store')}
        {renderGrid('grid7', 'Customer', styles.customersImg, 'CUSTOMERS', '/customers')}
        {renderGrid('grid8', 'Team', styles.teamImg, 'TEAM', '/comingsoon')}
        {renderGrid('grid9', 'Settings', styles.settingsImg, 'SETUP', '/main_setup')}

      </Grid>
    );
  };

  static contextType = StateContext;

  render() {
    const [{ grid: { isActive } }, dispatch] = Object.values(this.context);
    const { anchorEl, open } = this.state;
    const { session: { me }, offline } = this.props;
    if (_.isEmpty(me)) {
      return null;
    }
    const { activeOutlet } = me;

    return (
      <Fragment>
        {this.upperNavbar(isActive, dispatch)}
        <LowerNavbar
          username={me.username}
          activeOutlet={activeOutlet}
          open={open}
          anchorEl={anchorEl}
          handleMenu={this.handleMenu}
          handleLogOut={this.handleLogOut}
          handleClose={this.handleClose}
          currentUserRole={me.role.name}
          offline={offline}
        />
        <NetworkStatus offline={offline} />
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  offline: PropTypes.bool,
  isActive: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

Navbar.defaultProps = {
  session: { me: {} },
  offline: false,
  isActive: '',
  history: {},
};

export default withRouter(Navbar);
