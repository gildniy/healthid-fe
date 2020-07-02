import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  MenuList, MenuItem, Tooltip, IconButton
} from '@material-ui/core';
import AddCustomerDialog from '../../shared/customers/addCustomerDialog';
import { Export } from '../../../assets/images/stock/StockIcons';
import addlogo from '../../../assets/images/products/add.png';
import SavePrintPopper from '../../shared/savePrintPopper';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';
import { CustomIconButton, RenderPopper } from '../utils/utils';
import SavePrintTypes from '../../../providers/reducers/savePrint/savePrintTypes';
import CustomTableSearchField from '../../shared/customTableSearchField';

import { StateContext } from '../../../providers/stateProvider';

export class CustomToolBar extends Component {
  state = {
    customersOpen: false
  };

  handleAddCustomers = () => {
    this.setState(prevState => ({ customersOpen: !prevState.batchOpen }));
  };

  handleCloseCustomer = () => {
    this.setState({ customersOpen: false });
  };

  renderMenuItem = (handleClose, name, route) => (
    name === 'Add individual customer'
      ? (
        <MenuItem onClick={this.handleAddSingleCustomer} key={name}>
          {name}
        </MenuItem>
      ) : (
        <MenuItem onClick={handleClose} key={name}>
          <Link
            to={route}
            style={ToolbarStyles.menuLink}
          >
            {name}
          </Link>
        </MenuItem>
      )
  );

  handleAddSingleCustomer = () => {
    this.handleCloseCustomer();
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: { openDialog: true }
    });
  };

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
      classes,
      searchText,
      handleTextChange,
      componentRef,
      title
    } = this.props;
    const { customersOpen } = this.state;

    const CustomerAddMenu = [
      { name: 'Add individual customer', route: '' },
      { name: 'Import customer CSV', route: '/customers/add_csv' },
      { name: 'Migrate from existing software', route: '/customers/migrate' },
    ];

    return (
      <Fragment>
        <CustomTableSearchField
          styles={ToolbarStyles}
          searchText={searchText}
          handleChange={handleTextChange}
        />
        <CustomIconButton
          toolTip="Add customers"
          buttonRef={(node) => {
            this.addCustomerEl = node;
          }}
          onClickHandler={this.handleAddCustomers}
        >
          <img src={addlogo} style={{ width: '20px' }} alt="add-customers" />
        </CustomIconButton>
        <Tooltip title="Export List" style={{ marginLeft: '25px' }}>
          <IconButton onClick={this.handleSavePrintOpen}>
            <Export className={classes.ExportIcon} />
          </IconButton>
        </Tooltip>

        <SavePrintPopper
          fileName="healthID_customers.pdf"
          popperHeader={title}
          componentRef={componentRef}
        />
        <RenderPopper
          anchorEl={this.addCustomerEl}
          onClickAway={this.handleCloseCustomer}
          open={customersOpen}
          modifiers={{ offset: { enabled: true, offset: '-2vw, 1vh' } }}
        >
          <MenuList>
            {CustomerAddMenu.map(
              ({ name, route }) => this.renderMenuItem(this.handleCloseCustomer, name, route)
            )}
          </MenuList>
        </RenderPopper>
        <AddCustomerDialog />
      </Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  searchText: PropTypes.string,
  handleTextChange: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object),
  componentRef: PropTypes.instanceOf(Object),
  title: PropTypes.string
};

CustomToolBar.defaultProps = {
  searchText: '',
  classes: {},
  componentRef: {},
  title: ''
};

export default withStyles(ToolbarStyles)(CustomToolBar);
