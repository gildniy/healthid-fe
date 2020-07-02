import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, Slide
} from '@material-ui/core';
import { saleDetailsDialog as styles } from '../../assets/css/sellScreenStyles';
import SaleBatchList from './salesBatchList';
import SaleBatchHeader from './salesBatchHeader';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';
import {
  PRODUCT_BATCH_IN_STOCK,
  PRODUCT_BATCH_REF_OUT_STOCK,
} from '../products/Templates/BatchInformation';
import OutOfStockPopper from './outOfStockPopper';

const Transition = React.forwardRef(
  (props, ref) => <Slide direction="up" ref={ref} {...props} />
);

export const SalesBatchDialog = () => {
  const [
    {
      sell: {
        openSalesBatchDialog, selectedProduct, batchesForCart,
      },
    },
    dispatch
  ] = Object.values(useStateValue());
  const handleSelectedCheckBox = (selectedBatch, product) => {
    dispatch({
      type: sellActionTypes.TOGGLE_BATCHES_FOR_CART,
      payload: { selectedBatch, product }
    });
  };

  const isBatchSelected = (selectedBatch) => {
    const batch = batchesForCart.find(({ batchId }) => batchId === selectedBatch.id);
    return !!batch;
  };

  const handleBatchInputChange = (value, selectedBatch) => {
    dispatch({
      type: sellActionTypes.BATCH_INPUT_CHANGE,
      payload: { selectedBatch, value }
    });
  };

  const handleClickToAddProduct = () => {
    dispatch({ type: sellActionTypes.ADD_TO_CART });
  };

  const handleBatchDialogClose = () => {
    dispatch({ type: sellActionTypes.TOGGLE_SALE_BATCH_DIALOG });
  };

  const getOutOfStockQuantityToSell = () => {
    const { productbatchSet } = selectedProduct;
    const outOfstockBatch = productbatchSet.filter(
      data => data.batchRef === 'OUT OF STOCK'
    );
    const foundBatch = outOfstockBatch.length && batchesForCart.find(
      ({ batchId }) => batchId === outOfstockBatch[0].id,
    );
    return foundBatch ? foundBatch.quantity : 0;
  };

  const toggleOutOfStockBatch = (event) => {
    const outOfstockBatch = selectedProduct.productbatchSet.filter(data => data.batchRef === 'OUT OF STOCK');
    const outOfstockQuantity = outOfstockBatch ? outOfstockBatch[0].quantity : 0;
    const { currentTarget } = event;
    const outOfstockQty = getOutOfStockQuantityToSell();

    dispatch({
      type: sellActionTypes.TOGGLE_SELL_FROM_OUT_OF_STOCK,
      payload: {
        outOfStockEl: currentTarget,
        openOutOfStockPopper: true,
        outOfStockPopperParams: {
          outOfstockBatch,
          outOfstockQuantity,
          selectedProduct,
          batchesForCart: [
            ...batchesForCart.filter(({ batchId }) => batchId !== outOfstockBatch[0].id),
            {
              productId: selectedProduct.id,
              batchId: outOfstockBatch ? outOfstockBatch[0].id : 1,
              quantity: outOfstockQty,
              price: selectedProduct.salesPrice,
              discount: 0,
            },
          ]
        }
      }
    });
  };
  const isEligibleProductBatch = batch => (batch.status === PRODUCT_BATCH_IN_STOCK)
      && ((!!batch.batchRef && !!batch.dateReceived) && (batch.batchRef.trim() !== PRODUCT_BATCH_REF_OUT_STOCK));
  return (
    <Dialog
      open={openSalesBatchDialog}
      onClose={handleBatchDialogClose}
      maxWidth="sm"
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
        <SaleBatchHeader
          selectedProduct={selectedProduct}
          handleClickToAddProduct={handleClickToAddProduct}
          handleBatchDialogClose={handleBatchDialogClose}
          batchesForCart={batchesForCart}
          handleSellFromOutOfStock={toggleOutOfStockBatch}
          outOfstockQuantity={selectedProduct.productbatchSet && getOutOfStockQuantityToSell()}
        />
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <SaleBatchList
          batchesForCart={batchesForCart}
          filtrationTechnique={isEligibleProductBatch}
          selectedProduct={selectedProduct}
          handleSelectedCheckBox={handleSelectedCheckBox}
          handleBatchInputChange={handleBatchInputChange}
          isBatchSelected={isBatchSelected}
        />
        <OutOfStockPopper
          batchesForCart={batchesForCart}
          handleBatchInputChange={handleBatchInputChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SalesBatchDialog;
