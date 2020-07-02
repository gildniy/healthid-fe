import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide
} from '@material-ui/core';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmDialog = ({ open, handleCloseDialog, children }) => (
  <Dialog
    open={open}
    onClose={handleCloseDialog}
    maxWidth="sm"
    fullWidth
    position="relative"
    TransitionComponent={Transition}
    aria-labelledby="confirm-details-dialog"
    id="confirm-details-dialog"
  >
    {children}
  </Dialog>
);

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default ConfirmDialog;
