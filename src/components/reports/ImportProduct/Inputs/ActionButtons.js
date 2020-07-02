import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { ActionButtonStyles } from '../../../../assets/styles/products/addProductStyles';


const ActionButtons = (props) => {
  const { handleCloseEditDuplicates, handleEditProduct } = props;

  return (
    <Fragment>
      <Button
        variant="outlined"
        style={ActionButtonStyles.cancelButton}
        className="new-btn"
        onClick={handleCloseEditDuplicates}
      >
      CANCEL
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={ActionButtonStyles.saveButton}
        className="create-btn"
        onClick={handleEditProduct}
      >
      SAVE EDIT
      </Button>
    </Fragment>
  );
};

ActionButtons.propTypes = {
  handleCloseEditDuplicates: PropTypes.func.isRequired,
  handleEditProduct: PropTypes.func.isRequired
};

export default ActionButtons;
