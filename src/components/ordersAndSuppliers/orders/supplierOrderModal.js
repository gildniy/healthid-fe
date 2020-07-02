import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Modal, Paper, Typography, IconButton, Button
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { supplierNoteStyle } from '../../../assets/styles/suppliers/suppliers';

const SupplierOrderModal = (props) => {
  const {
    openModal,
    handleCloseModal,
    handleConfirm,
    text
  } = props;
  return (
    <Modal
      open={openModal}
      style={supplierNoteStyle.modal}
    >
      <Grid container item xs={7} style={supplierNoteStyle.modalContent}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <Grid item>
              <Grid item style={supplierNoteStyle.modalTitle}>
                <Typography variant="subtitle1">Orders Forms</Typography>
                <Grid item>
                  <IconButton
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <Close />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  textAlign: 'center',
                  padding: '18px 18px',
                  color: 'gray'
                }}
              >
                <Typography style={{ color: '#424242', fontSize: '16px' }}>
                  {text}
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  textAlign: 'center',
                  paddingBottom: '20px',
                  color: 'gray'
                }}
              >
                <Button
                  style={{
                    border: 'thin rgb(66, 66, 66) solid',
                    width: '120px',
                    color: 'thin rgb(66, 66, 66) solid',
                    borderRadius: '8px',
                    '&:hover': {
                      color: 'black',
                    }
                  }}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

SupplierOrderModal.defaultProps = {

};

SupplierOrderModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default SupplierOrderModal;
