/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { savePDF } from '@progress/kendo-react-pdf';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { Button, Grid } from '@material-ui/core';
import { ToolBarStyles } from '../../assets/styles/products/products';
import { Export } from '../../assets/images/stock/StockIcons';
import Icon from '../products/productIcons';
import SavePrintPopper from '../sell/salesHistory/savePrintPopper';
import statuslogo from '../../assets/images/products/status.png';
import CustomTableSearchField from '../shared/customTableSearchField';

export class CustomToolBar extends Component {
  state = {
    openView: false,
    openForm: false,
    openStock: false,
    savePrintOpen: false,
    savePrintAnchorEl: null,
    openOrder: false,
    openViewMenu: false,
  };

  static getDerivedStateFromProps({ status }) {
    return {
      openOrder: (status === 'open'), closed: (status === 'closed'),
    };
  }

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleForm = () => {
    const { openForm } = this.state;
    this.setState({ openForm: !openForm });
  };

  handleToggleViewMenu = () => {
    const { openViewMenu } = this.state;
    this.setState({ openViewMenu: !openViewMenu });
  };

  handleToggleView = () => {
    const { openView } = this.state;
    this.setState({ openView: !openView });
  };

  handlePrintButton = () => {
    this.setState(state => ({
      savePrintOpen: !state.savePrintOpen,
    }));
  };

  handleToggleStock = () => {
    const { openStock } = this.state;
    this.setState({ openStock: !openStock });
  };

  handleSaveButton = (html) => {
    savePDF(html, {
      scale: 0.6,
      paperSize: 'A3',
      repeatHeaders: true,
      landscape: true,
      fileName: 'healthID_Orders.pdf',
      margin: 10,
      top: 10
    });
    this.handlePrintButton();
  };

  handleSavePrintOpen = (event) => {
    const { currentTarget } = event;
    this.setState(state => ({
      savePrintOpen: !state.savePrintOpen,
      savePrintAnchorEl: currentTarget
    }));
  };

  handleClose = () => {
    this.setState({
      open: false,
      openView: false,
      openForm: false,
      openStock: false,
      savePrintOpen: false,
      openViewMenu: false,
    });
  };

  handleInitiate = () => {
    const { history } = this.props;
    history.push('/orders/initiate');
  };

  handleViewOrderForms = () => {
    const { history } = this.props;
    history.push('/orders/forms');
  };

  renderSwitches = () => {
    const { orderStatuses, handleViewOrders } = this.props;
    const switches = [];
    orderStatuses.forEach((statusValue, statusKey) => {
      switches.push(<FormControlLabel
        control={(
          <Switch
            checked={statusValue.selected}
            onChange={() => handleViewOrders(statusKey, statusValue)}
            id={statusKey}
            value={{ statusKey, statusValue }}
            color="primary"
          />
        )}
        label={statusValue.reads}
      />);
    });
    return switches;
  };

  render() {
    const {
      classes,
      popperHeader,
      componentRef,
      handleSearchTextChange,
    } = this.props;
    const {
      open, openView, openForm, openStock
    } = this.state;

    return (
      <React.Fragment>
        <CustomTableSearchField
          styles={ToolBarStyles}
          disabled
          handleChange={handleSearchTextChange}
        />
        <Tooltip title="Switch table view">
          <IconButton
            className={openView ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleView}
          >
            <img src={statuslogo} style={{ width: '24px' }} alt="" />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openView}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper elevation={2} className={classes.switchFormGroup}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <FormGroup className={classes.switchForm}>
                    {this.renderSwitches()}
                  </FormGroup>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Add Order">
          <IconButton
            className={open ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <Icon id="Initiate_new_order" className={classes.eyeButton} />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper elevation={2} className={classes.paperForm}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grid>
                    Initiate new Order?
                    <Grid container justify="space-evenly" className={classes.paperBtns}>
                      <Button
                        className={classes.closeBtn}
                        onClick={this.handleClose}
                      >
                        CANCEL
                      </Button>
                      <Button
                        className={classes.openBtn}
                        onClick={this.handleInitiate}
                      >
                        OPEN
                      </Button>
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Supplier Order Forms">
          <IconButton
            className={openForm ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleForm}
          >
            <Icon id="supplier_order_forms" className={classes.formButton} />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openForm}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper elevation={2} className={classes.paperForm}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grid>
                    View Supplier Order Forms?
                    <Grid container justify="space-evenly" className={classes.paperBtns}>
                      <Button
                        className={classes.closeBtn}
                        onClick={this.handleClose}
                      >
                        CANCEL
                      </Button>
                      <Button
                        className={classes.openBtn}
                        onClick={this.handleViewOrderForms}
                      >
                        OPEN
                      </Button>
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Stock Transfer">
          <IconButton
            className={openStock ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleStock}
          >
            <Icon id="stock_transfer" className={classes.stockButton} />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          open={openStock}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper elevation={2} className={classes.paperForm}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grid>
                    Open Stock Transfer?
                    <Grid container justify="space-evenly" className={classes.paperBtns}>
                      <Button
                        className={classes.closeBtn}
                        onClick={this.handleClose}
                      >
                        CANCEL
                      </Button>
                      <Button className={classes.openBtn}>OPEN</Button>
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Export List">
          <IconButton
            className={classes.iconButton}
            onClick={this.handleSavePrintOpen}
          >
            <Export className={classes.exportSVG2} />
          </IconButton>
        </Tooltip>
        <SavePrintPopper
          state={this.state}
          classes={classes}
          popperHeader={popperHeader}
          componentRef={componentRef}
          handlePrintButton={this.handlePrintButton}
          handleSaveButton={this.handleSaveButton}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleViewOrders: PropTypes.func.isRequired,
  isOrderOpen: PropTypes.bool.isRequired,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  status: PropTypes.string.isRequired
};

CustomToolBar.defaultProps = {
  history: {},
};


export default withStyles(ToolBarStyles)(CustomToolBar);
