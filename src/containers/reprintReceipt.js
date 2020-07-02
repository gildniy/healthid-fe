import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogContent, Zoom
} from '@material-ui/core';
import { SetupHeader } from '../assets/styles/setup';
import RecieptScreen from '../components/payment/recieptScreen';
import currencyFormatter from '../components/payment/utils/formatter';
import { saleHistoryStyles } from '../assets/styles/salesHistory/saleHistoryDetail';
import { OutletContactInfo } from '../utils/receipt/OutletContactInfo';

class ReprintReceipt extends Component {
  state = {
    open: false,
    anchorEl: {},
    placement: '',
    generateButtonStyle: SetupHeader.disabledSaveButton,
  };

  handleClickOpen = () => {
    this.setState(state => ({
      ...state,
      open: true,
    }));
  };

  handleClose = () => {
    this.setState(state => ({
      ...state, open: false
    }));
  };

  handlePaymentType = (event) => {
    if (event.target.id === 'card') {
      this.setState({ cashChecked: false, cardChecked: true });
    } else {
      this.setState({ cardChecked: false, cashChecked: true });
    }
  };

  handleClosePopOver = () => (
    this.setState({
      isNotesPopperOpen: false,
      anchorEl: {},
      placement: ''
    })
  );

  handleCloseDialog = () => {
    this.setState(state => ({
      ...state,
      open: false
    }));
  };

  render() {
    const { salesHistory } = this.props;
    const {
      open,
      generateButtonStyle
    } = this.state;
    const me = {
      firstName: salesHistory.salesPerson ? salesHistory.salesPerson.firstName : 'No Record',
      lastName: salesHistory.salesPerson ? salesHistory.salesPerson.lastName : 'No Record'
    };
    const products = salesHistory.saledetailSet.map(data => ({
      productName: data.product.productName,
      quantity: data.quantity,
      discountedTotal: data.price * data.quantity - (data.discount * (data.price * data.quantity)),
      salesPrice: data.price
    }));
    const outletContactInfo = new OutletContactInfo(salesHistory.outlet.outletcontactsSet);
    return (
      <Fragment>
        <Button
          style={{
            ...generateButtonStyle, ...saleHistoryStyles.reprintReceiptBtn
          }}
          onClick={this.handleClickOpen}
        >
          Re-Print Receipt
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth
          TransitionComponent={Zoom}
        >
          <DialogContent>
            <RecieptScreen
              me={me}
              barcodeUrl={salesHistory.receipt.barcode}
              receiptNo={salesHistory.receipt.receiptNo}
              registerID={salesHistory.receiptId}
              tradingName={salesHistory.outlet.name}
              country={salesHistory.outlet.city.country.name}
              city={salesHistory.outlet.city.name}
              phoneNumber={salesHistory.outlet.business.phoneNumber}
              addressLine1={salesHistory.outlet.business.addressLine1}
              outletContactInfo={outletContactInfo}
              products={products}
              cashRecieved={salesHistory.paidAmount}
              balanceDue={salesHistory.changeDue}
              computedSubTotal={currencyFormatter(salesHistory.subTotal)}
              computedDiscount={currencyFormatter(salesHistory.discountTotal)}
              computedTotal={salesHistory.amountToPay}
              handleClosePaymentDialog={this.handleCloseDialog}
              currency={salesHistory.outlet.outletpreference.outletCurrency.symbol}
            />

          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ReprintReceipt.propTypes = {
  salesHistory: PropTypes.shape({
    receiptId: PropTypes.string.isRequired,
    changeDue: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    discountTotal: PropTypes.string.isRequired,
    paidAmount: PropTypes.string.isRequired,
    amountToPay: PropTypes.string.isRequired,
    receipt: PropTypes.shape({
      barcode: PropTypes.string.isRequired,
      receiptNo: PropTypes.string.isRequired,
      purchaseTotal: PropTypes.string.isRequired,
    }).isRequired,
    salesPerson: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    saledetailSet: PropTypes.shape([]).isRequired,
    outlet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      outletcontactsSet: PropTypes.arrayOf(PropTypes.object),
      business: PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        addressLine1: PropTypes.string.isRequired,
      }).isRequired,
      outletpreference: PropTypes.shape({
        outletCurrency: PropTypes.string.isRequired,
      }).isRequired,
      city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired
};


export default ReprintReceipt;
