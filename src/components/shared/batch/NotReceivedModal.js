import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, Button,
} from '@material-ui/core';
import {
  ModalStyles, OrderDetailStyles
} from '../../../assets/styles/modal/modalStyles';

const NotReceivedModal = ({
  singleBatch, handleCloseDialog, handleSaveChanges,
}) => {
  const {
    productName
  } = singleBatch;

  return (
    <Paper elevation={0}>
      <Grid style={ModalStyles.editHeader}>
        <Typography style={OrderDetailStyles.title}>
          <span style={{ opacity: '1', fontWeight: 'bold', marginRight: '20px', }}>
            { productName }
            {' '}
          </span>
        </Typography>
      </Grid>
      <h2 style={ModalStyles.ModalText}> Mark as not received? </h2>
      <Grid style={OrderDetailStyles.buttonContainer} justify="center">
        <Button style={OrderDetailStyles.cancelButton} onClick={handleCloseDialog}>
          Cancel
        </Button>

        <Button
          onClick={handleSaveChanges}
          size="medium"
          style={OrderDetailStyles.saveButton}
          variant="contained"
          color="secondary"
          name="submit"
        >
          Confirm
        </Button>
      </Grid>
    </Paper>
  );
};


NotReceivedModal.propTypes = {
  singleBatch: PropTypes.objectOf(Object),
  handleCloseDialog: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
};

NotReceivedModal.defaultProps = {
  singleBatch: {}
};

export default NotReceivedModal;
