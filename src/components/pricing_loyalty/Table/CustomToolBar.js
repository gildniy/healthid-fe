import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import addlogo from '../../../assets/images/products/add.png';
import exportlogo from '../../../assets/images/products/export.png';
import CustomTableSearchField from '../../shared/customTableSearchField';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';
import { CustomIconButton } from '../../stock_control/utils/utils';

export class CustomToolBar extends Component {
  state = {
    open: false,
  }

  render() {
    const {
      handleTextChange,
      state: { searchText }
    } = this.props;

    return (
      <Fragment>
        <CustomTableSearchField
          styles={ToolbarStyles}
          searchText={searchText}
          handleChange={handleTextChange}
        />
        <CustomIconButton
          toolTip="Add Product"
          buttonRef={(node) => {
            this.addProductElement = node;
          }}
        >
          <img src={addlogo} style={{ width: '20px' }} alt="add Product" />
        </CustomIconButton>
        <CustomIconButton
          toolTip="Export List"
          buttonRef={(node) => {
            this.addBatchEl = node;
          }}
        >
          <img src={exportlogo} style={{ width: '20px' }} alt="" />
        </CustomIconButton>
      </Fragment>
    );
  }
}

CustomToolBar.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object),
};

CustomToolBar.defaultProps = {
  state: {}
};

export default withStyles(ToolbarStyles)(CustomToolBar);
