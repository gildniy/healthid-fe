/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import ConfirmDialog from '../shared/batch/confirmDialog';
import NotReceivedModal from '../shared/batch/NotReceivedModal';
import notify from '../shared/Toaster';
import UPDATE_PRODUCT_BATCH from '../../mutations/updateProductBatch';

import { StateContext } from '../../providers/stateProvider';

class ConfirmMadal extends React.Component {
  state = {
    supplier: '',
    supplierId: '',
  };

  handleSaveChanges = () => {
    const [
      { batchInformation: { singleBatch } }, dispatch
    ] = Object.values(this.context);
    const { supplier } = this.state;
    const { updateProductBatch } = this.props;
    const {
      productName, orderId, supplierId, batchId
    } = singleBatch;
    updateProductBatch({
      variables: {
        supplierId,
        ids: [batchId],
        status: 'NOT_RECEIVED',
      }
    }).then(() => {
      notify(`Batch for ${productName} updated successfully`);
    }).catch((error) => {
      notify(error.message.slice(14));
    });

    dispatch({
      type: 'UPDATE_PRODUCT_BATCH',
      payload: {
        openDialog: false,
        openModal: false,
        supplier,
        supplierId
      }
    });
  }

  static contextType = StateContext;

  render() {
    const { state } = this.context;
    const { batchInformation } = state;
    const { singleBatch, openModal } = batchInformation;
    const { handleClose } = this.props;

    return (
      <Fragment>
        <ConfirmDialog open={openModal} handleCloseDialog={handleClose}>
          <NotReceivedModal
            singleBatch={singleBatch}
            state={this.state}
            handleCloseDialog={handleClose}
            {...this.props}
            handleSaveChanges={this.handleSaveChanges}
          />
        </ConfirmDialog>
      </Fragment>
    );
  }
}

const UPDATE_PRODUCT_BATCH_MUTATION = graphql(UPDATE_PRODUCT_BATCH, { name: 'updateProductBatch' });

export default compose(
  UPDATE_PRODUCT_BATCH_MUTATION
)(ConfirmMadal);
