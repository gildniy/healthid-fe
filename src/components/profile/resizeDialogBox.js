import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ReactCrop from 'react-image-crop';
import { invoiceModal } from '../../assets/styles/orders/modalStyles';

export const ResizeDialog = (props) => {
  const {
    state,
    onCropChange,
    handleClose,
  } = props;
  return (
    <div>
      <Dialog
        open={state.open}
      >
        <DialogTitle disableTypography id="csv-title" className="dialog-title">
          <Typography variant="subtitle2">
            Invoice Upload Preview
          </Typography>
        </DialogTitle>
        <DialogContent style={invoiceModal.imageBox}>
          <ReactCrop
            src={state.src}
            crop={state.crop}
            onChange={onCropChange}
          />
        </DialogContent>
        <DialogActions style={invoiceModal.dialogBox}>
          <Button
            onClick={handleClose}
            variant="contained"
            autoFocus
            color="secondary"
            style={invoiceModal.continueButton}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ResizeDialog.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  onCropChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(ResizeDialog);
