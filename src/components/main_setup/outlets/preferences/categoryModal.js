import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
  Modal,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { MainPreferencesStyles } from '../../../../assets/styles/setup';

const CategoryModal = (props) => {
  const {
    openModal,
    handleCloseModal,
    handleChange,
    handleConfirmChanges,
    stateData,
  } = props;

  function handleClose() {
    handleCloseModal();
  }
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      style={MainPreferencesStyles.modal}
    >
      <Grid container item xs={7} style={MainPreferencesStyles.modalContent}>
        <Grid item xs={12}>
          <Paper elevation={2} style={MainPreferencesStyles.modalBody}>
            <Grid item style={MainPreferencesStyles.modalTitle}>
              <Grid item style={MainPreferencesStyles.modalSection}>
                <Typography variant="subtitle2">Category</Typography>
                <TextField
                  type="text"
                  value={stateData.name}
                  margin="none"
                  onChange={handleChange({ field: 'name', category: stateData.id })}
                  style={MainPreferencesStyles.modalTitleInput}
                />
              </Grid>
              <Grid item style={MainPreferencesStyles.modalSection}>
                <IconButton
                  aria-label="Done"
                  style={MainPreferencesStyles.categoryIcons}
                  onClick={handleConfirmChanges}
                >
                  <Done />
                </IconButton>
                <IconButton
                  aria-label="clear"
                  style={MainPreferencesStyles.categoryIcons}
                  onClick={handleClose}
                >
                  <Clear />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              style={MainPreferencesStyles.categoryRow}
            >
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">Default Sales Markup (%)</Typography>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    value={stateData.markup}
                    onChange={handleChange({ field: 'markup', category: stateData.id })}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">VAT Applicable</Typography>
                <TextField
                  select
                  value={stateData.isVatApplicable || false}
                  onChange={handleChange({ field: 'isVatApplicable', category: stateData.id })}
                  margin="normal"
                >
                  <MenuItem value>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4} style={MainPreferencesStyles.modalCell} align="center">
                <Typography variant="subtitle2" align="center">Loyalty Calculator</Typography>
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    value={stateData.loyaltyWeight}
                    onChange={handleChange({ field: 'loyaltyWeight', category: stateData.id })}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

CategoryModal.defaultProps = {
  stateData: {
    id: '',
    name: '',
    markup: 0,
    isVatApplicable: false,
    loyaltyWeight: 0,
  }
};

CategoryModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleConfirmChanges: PropTypes.func.isRequired,
  stateData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    markup: PropTypes.number,
    isVatApplicable: PropTypes.bool,
    loyaltyWeight: PropTypes.number,
  })
};

export default CategoryModal;
