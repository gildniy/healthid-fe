import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@material-ui/core';
import VersionDetails from './VersionDetails';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const VersionDialog = ({
  supplier, currentSupplier,
  isDialogOpen, toggleDialogView,
  handleApproveVersion, handleRejectVersion, activeOutlet
}) => (
  <Dialog
    open={isDialogOpen}
    onClose={toggleDialogView}
    maxWidth="md"
    fullWidth
    TransitionComponent={Transition}
    aria-labelledby="customer-details-dialog"
    id="customer-details-dialog"
  >
    {supplier ? (
      <VersionDetails
        supplier={supplier}
        currentSupplier={currentSupplier}
        handleApproveVersion={handleApproveVersion}
        handleRejectVersion={handleRejectVersion}
        activeOutlet={activeOutlet}
      />
    ) : ''}
  </Dialog>
);

VersionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired,
  currentSupplier: PropTypes.instanceOf(Object).isRequired,
  toggleDialogView: PropTypes.func.isRequired,
  handleApproveVersion: PropTypes.func.isRequired,
  handleRejectVersion: PropTypes.func.isRequired,
  activeOutlet: PropTypes.instanceOf(Object).isRequired
};

export default VersionDialog;
