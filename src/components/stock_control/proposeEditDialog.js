import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, Slide,
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { EDIT_QUANTITY } from '../../mutations/stockControl';
import ProposeEditHeader from './proposeEditHeader';
import ProposeEditBatch from './proposeEditBatch';
import notify from '../shared/Toaster';
import StockActionTypes from '../../providers/reducers/stock/stockTypes';
import '../../assets/styles/stock/propose_edit_dialog.scss';

import { StateContext } from '../../providers/stateProvider';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export class ProposeEdiDialog extends Component {
  handleClick = (proposedQuantity) => {
    const [
      { stock: { batchQuantities } }, dispatch
    ] = Object.values(this.context);
    const { data, handleClickDeselectAll } = this.props;
    const params = {
      productId: data.id,
      batchIds: batchQuantities.map(({ id }) => id),
      proposedQuantities: batchQuantities.map(({ quantity }) => quantity)
    };
    dispatch({ type: StockActionTypes.TOGGLE_LOADING });

    proposedQuantity({
      variables: { ...params }
    }).then((response) => {
      dispatch({ type: StockActionTypes.TOGGLE_LOADING });
      notify(response.data.proposedQuantity.notification);
      handleClickDeselectAll();
      this.handleDialogClose();
    }).catch((error) => {
      dispatch({ type: StockActionTypes.TOGGLE_LOADING });
      notify(error.message.split(':')[1].trim());
    });
  };

  handleBatchInputChange = (id, quantity) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: StockActionTypes.CHANGE_QUANTITY,
      payload: { id, quantity }
    });
  };

  handleDialogClose = () => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: StockActionTypes.TOGGLE_DIALOG
    });
  }

  static contextType = StateContext;

  render() {
    const { data } = this.props;
    const batchData = data && data.batchId;
    const nonEmpty = batchData && batchData.length >= 1;
    const [{ stock: { openDialog, isLoading } }] = Object.values(this.context);

    return (
      <Mutation mutation={EDIT_QUANTITY}>
        {proposedQuantity => (
          <Dialog
            open={openDialog}
            onClose={this.handleDialogClose}
            maxWidth="false"
            width="40vw"
            className="dialog"
            fullWidth
            TransitionComponent={Transition}
            aria-labelledby="propose-edit-dialog"
            id="propose-edit-dialog"
          >
            <DialogTitle
              id="propose-edit-dialog-title"
              className="dialog-title-2"
            >
              <ProposeEditHeader
                data={data}
                nonEmpty={nonEmpty}
                isLoading={isLoading}
                handleBatchUpdate={() => this.handleClick(proposedQuantity)}
                handleDialogClose={this.handleDialogClose}
              />
            </DialogTitle>
            <DialogContent className="dialog-content-2">
              {nonEmpty ? batchData.map(batch => (
                <ProposeEditBatch
                  batch={batch}
                  handleBatchInputChange={this.handleBatchInputChange}
                />
              )) : (
                <span>Product has no batches</span>
              )}
            </DialogContent>
          </Dialog>
        )}
      </Mutation>
    );
  }
}

ProposeEdiDialog.propTypes = {
  data: PropTypes.instanceOf(Object),
  handleClickDeselectAll: PropTypes.func.isRequired
};

ProposeEdiDialog.defaultProps = {
  data: {}
};

export default ProposeEdiDialog;
