import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Tooltip, IconButton, MenuList, MenuItem
} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
  Export
} from '../../../../assets/images/stock/StockIcons';
import { ToolbarStyles } from '../../../../assets/styles/stock/stock';
import { supplyStyles } from '../../../../assets/styles/suppliers/suppliers';
import { CustomIconButton, RenderPopper } from '../../../stock_control/utils/utils';
import statuslogo from '../../../../assets/images/products/status.png';
import addlogo from '../../../../assets/images/products/add.png';
import CustomTableSearchField from '../../../shared/customTableSearchField';

export class CustomToolBar extends Component {
  state = {
    open: false,
    addSupplierOpen: false,
    proposed: false,
    approved: true
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleToggleAddSupplier = () => {
    const { addSupplierOpen } = this.state;
    this.setState({ addSupplierOpen: !addSupplierOpen });
  };

  handleCloseAddSupplier = (event) => {
    !this.addSupplierElement.contains(event.target) && this.setState({ addSupplierOpen: false });
  };

  handleToggleViewMenu = () => {
    const { openViewMenu } = this.state;
    this.setState({ openViewMenu: !openViewMenu });
  };

  handleClose = () => {
    this.setState({ openAddMenu: false, openViewMenu: false });
  };

  handleChangeView = () => {
    const { handleViewProposed } = this.props;
    const { approved, proposed } = this.state;
    this.setState({
      proposed: !proposed,
      approved: !approved
    });
    const statusObject = {
      approved: !approved,
      proposed: !proposed,
    };
    handleViewProposed(statusObject);
  };

  render() {
    const {
      addSupplierOpen, openViewMenu, approved, proposed
    } = this.state;
    const {
      classes,
      isAdmin,
      handleTextChange,
      searchText,
    } = this.props;

    return (
      <>
        <CustomTableSearchField
          styles={ToolbarStyles}
          handleChange={handleTextChange}
          searchText={searchText}
        />
        {isAdmin
          && (
            <CustomIconButton
              toolTip="Add Supplier"
              buttonRef={(node) => {
                this.addSupplierElement = node;
              }}
              onClickHandler={() => this.handleToggleAddSupplier()}
            >
              <img src={addlogo} style={{ width: '20px' }} alt="" />
            </CustomIconButton>
          )}
        <Tooltip title="Switch table view">
          <IconButton
            style={{
              marginLeft: '25px'
            }}
            className={!openViewMenu ? classes.iconButtonActive : classes.iconButton}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            aria-owns={openViewMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleViewMenu}
          >
            <img src={statuslogo} style={{ width: '24px' }} alt="" />
          </IconButton>
        </Tooltip>
        <Popper
          className={classes.popper}
          style={{ padding: '20px' }}
          open={openViewMenu}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={2} className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <FormGroup>
                    <FormControlLabel
                      className={classes.switchFormGroupSupplier}
                      control={(
                        <Switch
                          checked={approved}
                          onChange={this.handleChangeView}
                          id="approved"
                          value="approved"
                          color="primary"
                        />
                      )}
                      label="View Approved Suppliers"
                    />
                    <FormControlLabel
                      className={classes.switchFormGroupSupplier}
                      control={(
                        <Switch
                          checked={proposed}
                          onChange={this.handleChangeView}
                          id="proposed"
                          value="proposed"
                          color="primary"
                        />
                      )}
                      label="View Proposed Suppliers"
                    />
                  </FormGroup>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Tooltip title="Export List">
          <IconButton
            style={{
              marginLeft: '25px'
            }}
          >
            <Export className={classes.svgIcon} />
          </IconButton>
        </Tooltip>
        <RenderPopper
          anchorEl={this.addSupplierElement}
          onClickAway={this.handleCloseAddSupplier}
          open={addSupplierOpen}
        >
          <MenuList>
            <MenuItem onClick={this.handleCloseAddSupplier}>
              <Link to="/suppliers/add" className={classes.menuLink}>
                Add Individual Supplier
              </Link>

            </MenuItem>
            <MenuItem onClick={this.handleCloseAddSupplier}>
              <Link
                to="/suppliers/new/import"
                style={supplyStyles.menuLink}
              >
                Import Supplier CSV
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleMigrateSupplier}>
              <Link
                to="/suppliers-migrate"
                style={supplyStyles.menuLink}
              >
                Migrate Suppliers from Software
              </Link>
            </MenuItem>
          </MenuList>
        </RenderPopper>
      </>
    );
  }
}

CustomToolBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  searchText: PropTypes.string,
};

CustomToolBar.defaultProps = {
  searchText: ''
};

export default withStyles(ToolbarStyles)(CustomToolBar);
