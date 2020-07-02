import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide
} from '@material-ui/core';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const BatchDetailDialog = ({ open, handleCloseDialog, children }) => (
  <Dialog
    open={open}
    onClose={handleCloseDialog}
    maxWidth="md"
    fullWidth
    TransitionComponent={Transition}
    aria-labelledby="customer-details-dialog"
    id="customer-details-dialog"
  >
    {children}
  </Dialog>
);

BatchDetailDialog.propTypes = {
  open: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
  children: PropTypes.node,
};

BatchDetailDialog.defaultProps = {
  open: false,
  children: {},
};

export default BatchDetailDialog;
