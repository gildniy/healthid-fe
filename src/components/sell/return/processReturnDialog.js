import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, Slide
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { saleDetailsDialog as styles } from '../../../assets/css/sellScreenStyles';

import { useStateValue } from '../../../providers/stateProvider';
import ProcessReturnHeader from './processReturnHeader';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';
import ReturnBatchList from './returnBatchList';

const Transition = React.forwardRef(
  (props, ref) => <Slide direction="up" ref={ref} {...props} />
);

export const ProcessReturnDialog = ({ history }) => {
  const [
    {
      returns: {
        openProcessReturnDialog, toBeReturnedBatches, dateSold, timeSold
      },
    },
    dispatch
  ] = Object.values(useStateValue());
  const handleReturnDialogClose = () => {
    dispatch({ type: returnsActionTypes.TOGGLE_PROCESS_RETURN_DIALOG });
  };
  const handleClickToReturn = () => {
    dispatch({ type: returnsActionTypes.AGGREGATE_BATCHES });
    history.push('/returns');
  }

  return (
    <Dialog
      open={openProcessReturnDialog}
      onClose={handleReturnDialogClose}
      maxWidth="md"
      style={{ backgroundColor: 'rgba(100, 100, 100, 0.4)' }}
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="sale-details-dialog"
      id="sale-details-dialog"
      disableEnforceFocus
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={styles.dialogTitle}
      >
        <ProcessReturnHeader
          dateSold={dateSold}
          timeSold={timeSold}
          handleClickToReturn={handleClickToReturn}
          handleReturnDialogClose={handleReturnDialogClose}
          batchesForReturn={toBeReturnedBatches}
        />
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <ReturnBatchList />
      </DialogContent>
    </Dialog>
  );
};
ProcessReturnDialog.propTypes = {
  history: PropTypes.instanceOf(Object)
};
ProcessReturnDialog.defaultProps = {
  history: {}
}

export default withRouter(ProcessReturnDialog);
