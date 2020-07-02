/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid
} from '@material-ui/core';
import initiateOrderStyles from '../../../assets/styles/orders/newOrder';

const OutletsList = ({ destinationOutlet, handleChange, outlets }) => (
  <FormControl style={{ width: '40%' }}>
    <InputLabel style={{ color: '#A3A3A3', fontSize: '18px' }} id="to">Deliver To</InputLabel>
    <Select
      required
      style={initiateOrderStyles.outletSelect}
      name="destinationOutlet"
      value={destinationOutlet || ''}
      onChange={handleChange}
    >
      {
        outlets.map(outlet => (
          <MenuItem
            style={initiateOrderStyles.outletMenu}
            key={outlet.id}
            value={outlet.id}
          >
            <Grid container justify="space-between">
              <Grid item style={initiateOrderStyles.outletName}>
                {outlet.name}
              </Grid>
              <Grid item style={initiateOrderStyles.outletId}>{`ID ${outlet.id}`}</Grid>
            </Grid>
          </MenuItem>
        ))
      }
    </Select>
  </FormControl>
);

OutletsList.propTypes = {
  destinationOutlet: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  outlets: PropTypes.array.isRequired
};

export default OutletsList;
