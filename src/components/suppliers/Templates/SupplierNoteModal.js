import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Modal,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import { supplierNoteStyle } from '../../../assets/styles/suppliers/suppliers';

const SupplierNoteModal = (props) => {
  const {
    openAddModel,
    handleCloseModal,
    handleChange,
    note,
    handleSaveNote,
    headerText

  } = props;
  return (
    <Modal
      open={openAddModel}
      style={supplierNoteStyle.modal}
    >
      <Grid container item xs={7} style={supplierNoteStyle.modalContent}>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <Grid item>
              <Grid item style={supplierNoteStyle.modalTitle}>
                <Typography variant="subtitle2">{headerText}</Typography>
                <Grid item>
                  <IconButton
                    aria-label="Done"
                    onClick={handleSaveNote}
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <Close />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item style={supplierNoteStyle.modalBody}>
                <TextField
                  inputProps={{ style: { fontSize: '0.875rem' } }}
                  fullWidth
                  value={note}
                  variant="outlined"
                  multiline
                  rows={2}
                  rowsMax={2}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

SupplierNoteModal.defaultProps = {

};

SupplierNoteModal.propTypes = {
  openAddModel: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSaveNote: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,


};

export default SupplierNoteModal;
