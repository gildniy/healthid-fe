import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { tableQuantityStyles } from '../../assets/css/sellScreenStyles';

export const ReturnQuantity = ({
  item,
  classes,
  handleClickViewDetails,
}) => (
  <div className={classes.iconsCell}>
    <Input
      name="quantity"
      value={item.quantity}
      className={classes.paperInput}
      disableUnderline
      readOnly
      onClick={handleClickViewDetails}
      inputProps={{
        style: {
          textAlign: 'right',
          paddingRight: '5px',
          color: '#E8E8E8',
          cursor: 'pointer'
        }
      }}
    />
  </div>
);
ReturnQuantity.propTypes = {
  item: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  handleClickViewDetails: PropTypes.func.isRequired
};

ReturnQuantity.defaultProps = {
  item: {},
  classes: {},
};

export default withStyles(tableQuantityStyles)(ReturnQuantity);
