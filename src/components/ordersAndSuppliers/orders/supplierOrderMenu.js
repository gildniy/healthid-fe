/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropsTypes from 'prop-types';
import {
  Grid, Typography, IconButton, Tooltip
} from '@material-ui/core';
import DeleteIcon from '../../../assets/images/supplierOrderForms/Delete.png';
import SelectAll from '../../../assets/images/supplierOrderForms/Select_All.png';
import SelectNone from '../../../assets/images/supplierOrderForms/Select_None.png';
import InverseSelect from '../../../assets/images/supplierOrderForms/Inverse_Select.png';
import PlaceOrder from '../../../assets/images/supplierOrderForms/Place_Order.png';

import pageStyle from '../../../assets/styles/orders/supplierOrderForms';

const SelectMenu = ({ selected, action }) => (
  <Grid
    style={{ ...pageStyle.contentHeader, ...pageStyle.menuTab }}
  >
    <Typography style={pageStyle.selected} variant="h5">
      {`${selected} form(s) selected`}
    </Typography>
    <Tooltip title="Place Order(s)" onClick={() => action('place_orders')}>
      <IconButton style={pageStyle.icon}>
        <img src={PlaceOrder} style={pageStyle.iconImage} alt="" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Select All" onClick={() => action('select_all')}>
      <IconButton style={pageStyle.icon}>
        <img src={SelectAll} style={pageStyle.iconImage} alt="" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Select None" onClick={() => action('select_none')}>
      <IconButton style={pageStyle.icon}>
        <img src={SelectNone} style={pageStyle.iconImage} alt="" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Inverse Select" onClick={() => action('invert_select')}>
      <IconButton style={pageStyle.icon}>
        <img src={InverseSelect} style={pageStyle.iconImage} alt="" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Cancel Order(s)" onClick={() => action('cancel_orders')}>
      <IconButton style={pageStyle.icon}>
        <img src={DeleteIcon} style={pageStyle.iconImage} alt="" />
      </IconButton>
    </Tooltip>
  </Grid>
);

SelectMenu.propTypes = {
  selected: PropsTypes.number.isRequired,
  action: PropsTypes.func.isRequired
};

export default SelectMenu;
