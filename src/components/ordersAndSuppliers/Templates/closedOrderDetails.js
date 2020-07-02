import React, { useRef, useContext } from 'react';
import {
  Button, Grid, Typography, Modal, Dialog, Divider, Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import OrderTable from './orderTable';
import ReceiveOrder from './receiveOrder';
import OrderInfo from './OrderInfo';
import { Capitalize, checkProductRecieved } from './helpers';
import { PrintInvoice } from './decriptionTemplates/printInvoice';
import { UploadInvoiceContainer } from './decriptionTemplates/uploadInvoiceContainer';
import ViewInvoice from './decriptionTemplates/viewInvoice';
import UploadInvoice from './decriptionTemplates/uploadInvoice';
import batchTypes from '../../../providers/reducers/batch/batchTypes';
import ModalForm from '../../modal/modalForm';
import ConfirmModal from '../../modal/confirmModal';
import { modalStyles } from '../../../assets/styles/orders/modalStyles';

import { StateContext } from '../../../providers/stateProvider';

const ClosedOrderDetails = ({
  classes,
  receivedOrder,
  supplierOrderId
}) => {
  const [open, setOpen] = React.useState(false);
  const context = useContext(StateContext);
  let imageRef = useRef();
  const {
    orderDetails,
    invoice,
    status,
    supplierOrderName,
    supplierOrderNumber,
  } = receivedOrder;
  const { supplier } = orderDetails[0];

  const imgInvoice = !invoice
    ? <Typography align="center">No image to display</Typography>
  // eslint-disable-next-line no-return-assign
    : <img className={classes.image} ref={image => imageRef = image} src={invoice.imageUrl} alt="invoice" />;
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const openBatchModal = (row) => {
    const [, dispatch] = Object.values(context);
    dispatch({
      type: batchTypes.GET_PRODUCT_BATCH,
      payload: {
        supplierOrderId,
        batchId: row.id,
        productId: parseInt(row.id, 10),
        productName: row.name,
        dateReceived: new Date().toISOString().split('T')[0],
        expiryDate: new Date().toISOString().split('T')[0],
        supplier: supplier.name,
        costPerItem: row.cost,
        quantityReceived: row.qtyOrdered,
        supplierId: supplier.id,
        openDialog: true,
        openModal: false,
      }
    });
  };

  const openNotReceivedModal = (row) => {
    checkProductRecieved(context, supplierOrderId, row, supplier, 0, true, false, 'false', '1');
  };

  const markAsReceived = (row) => {
    const quantity = orderDetails.filter(data => data.product.id === row.id);
    checkProductRecieved(context, supplierOrderId, row, supplier, quantity[0].orderedQuantity, false, true, '', '');
  };

  const closeBatchModal = () => {
    const [, dispatch] = Object.values(context);
    dispatch({
      type: 'CLOSE_PRODUCT_BATCH',
      payload: {
        openDialog: false,
        openModal: false
      }
    });
  };

  const displayContent = (status === 'CLOSED') ? (
    <PrintInvoice classes={classes} onClick={handleOpen} />
  ) : (
    <UploadInvoiceContainer classes={classes} onClick={handleOpen} />
  );
  return (
    <>
      <Paper elevation={2} square className={classes.paper}>
        <Grid item container justify="center">
          <Typography variant="h6" className={classes.headerTypo}>
            {Capitalize(supplierOrderName)}
          </Typography>
        </Grid>
        <Divider light />
        <Grid container className={classes.containerGrid}>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <Grid item xs={9}>
                <Typography className={classes.orderID}>
                  {supplierOrderNumber.toUpperCase() || 'No supplier order number'}
                </Typography>
                <OrderInfo classes={classes} receivedOrder={receivedOrder} />
              </Grid>
              {displayContent}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ReceiveOrder
        supplierOrderId={supplierOrderId}
        receivedOrder={receivedOrder}
        classes={classes}
      />
      <OrderTable
        orderDetails={orderDetails}
        openBatchModal={openBatchModal}
        openNotReceivedModal={openNotReceivedModal}
        markAsReceived={markAsReceived}
        status={status}
      />
      <ModalForm
        handleClose={closeBatchModal}
        orderName={supplierOrderName}
      />
      <ConfirmModal
        handleClose={closeBatchModal}
        orderName={supplierOrderName}
      />
      {status === 'CLOSED' ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <ViewInvoice
              classes={classes}
              imgInvoice={imgInvoice}
              onClick={handleClose}
              invoice={invoice}
              trigger={() => (
                <Button
                  name="printButton"
                  variant="contained"
                  className={classes.printButton}
                  color="black"
                >
                  Print
                </Button>
              )}
              content={() => imageRef}
            />
          </div>
        </Modal>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          aria-labelledby="customer-csv-dialog"
          id="customer-csv-dialog"
        >
          <UploadInvoice
            handleCloseModal={handleClose}
            classes={classes}
            supplierOrderId={supplierOrderId}
            id="customer-csv-dialog"
          />
        </Dialog>
      )}
    </>
  );
};

ClosedOrderDetails.propTypes = {
  supplierOrderId: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
  receivedOrder: PropTypes.instanceOf(Object),
};

ClosedOrderDetails.defaultProps = {
  supplierOrderId: '',
  classes: {},
  receivedOrder: {},
};

export default withStyles(modalStyles)(ClosedOrderDetails);
