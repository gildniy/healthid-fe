import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import currencyFormatter from '../utils/formatter';
import notify from '../../shared/Toaster';
import SalesSummary from '../salesSummary';
import CREATE_SALE_MUTATION from '../../../mutations/sellScreen/createSaleMutation';
import OfflineBarCode from '../../../assets/images/sellScreen/receiptBarcode.png';
import OfflineMutation from '../../../graphql/offline/offlineMutation';
import { OutletContactInfo } from '../../../utils/receipt/OutletContactInfo';

import { StateContext } from '../../../providers/stateProvider';

export class PaymentContainer extends Component {
  initialState = {
    processing: false,
    sale: false,
    cardChecked: false,
    cashChecked: false,
    bankChecked: false,
    cashRecieved: '',
    balanceDue: 0,
    cashConfirmed: false,
    isNotesPopperOpen: false,
    anchorEl: {},
    placement: '',
    loading: false,
    receiptNo: '',
    barcodeUrl: '',
    city: '',
    country: '',
    phoneNumber: '',
    tradingName: '',
    registerID: '',
    addressLine1: '',
    cashCollected: 0,
    cardCollected: 0,
    transferCollected: 0,
    changeDue: 0
  };

  state = { ...this.initialState }

  outletContactInfo = new OutletContactInfo();

  handlePaymentType = (event) => {
    switch (event.target.id) {
    case 'card':
      this.setState({
        cashChecked: false,
        bankChecked: false,
        cardChecked: true,
      });
      break;
    case 'bank':
      this.setState({
        cashChecked: false,
        bankChecked: true,
        cardChecked: false,
      });
      break;
    case 'cash':
      this.setState({
        cashChecked: true,
        bankChecked: false,
        cardChecked: false,
      });
      break;

    default:
      break;
    }
  };

  handleProcessing = () => {
    this.setState({ processing: true });
  };

  validatePayment = () => {
    const {
      cashCollected,
      cardCollected,
      transferCollected
    } = this.state;

    const {
      totalToPay
    } = this.props;

    return cashCollected + cardCollected + transferCollected >= totalToPay;
  }

  processPaymentBalance = () => {
    const isValid = this.validatePayment();
    const {
      totalToPay
    } = this.props;

    const {
      cashCollected,
      cardCollected,
      transferCollected
    } = this.state;

    const balance = totalToPay - (cashCollected + cardCollected + transferCollected);

    this.setState({
      balanceDue: balance > 0 ? balance : 0
    });

    if (isValid) {
      const change = (cashCollected + cardCollected + transferCollected) - totalToPay;

      this.setState({
        changeDue: change,
        cashConfirmed: true
      });
    } else {
      this.setState({
        cashConfirmed: false,
        changeDue: 0
      });
    }
  }

  handleCashCollectedInput = (event) => {
    this.setState({
      cashCollected: Number(event.target.value)
    }, () => this.processPaymentBalance());
  }

  handleCardCollectedInput = (event) => {
    this.setState({
      cardCollected: Number(event.target.value)
    }, () => this.processPaymentBalance());
  }

  handleTransferCollectedInput = (event) => {
    this.setState({
      transferCollected: Number(event.target.value)
    }, () => this.processPaymentBalance());
  }

  processCashBalance = (cashValue) => {
    const isValid = this.validateCashPayment(cashValue);
    const { totalToPay } = this.props;

    if (isValid) {
      const balance = cashValue - totalToPay;
      this.setState({ balanceDue: balance, cashConfirmed: true });
    } else {
      this.setState({ balanceDue: 0, cashConfirmed: false });
    }
  };

  handleCashInput = (event) => {
    this.processCashBalance(event.target.value);
    this.setState({ cashRecieved: event.target.value });
  }

  validateCashPayment = (cashValue) => {
    const { totalToPay } = this.props;
    return cashValue >= totalToPay;
  }

  handleBackToSalesSummary = () => (
    this.setState(state => ({
      ...state, processing: false
    }))
  )

  handleDisplayNotesPopper = ({ currentTarget }) => {
    this.setState({
      isNotesPopperOpen: true,
      anchorEl: currentTarget,
      placement: 'bottom-end'
    });
  }

  handleClosePopOver = () => (
    this.setState({
      isNotesPopperOpen: false,
      anchorEl: {},
      placement: ''
    })
  );

  filterMutationProducts = (products) => {
    const batches = [];
    products.map(
      ({ soldBatches, note }) => soldBatches.map(
        ({
          batchId, productId, quantity, price, discount
        }) => {
          batches.push({
            batchId, productId, quantity, price, discount, note
          });
          return batchId;
        }
      )
    );
    return batches;
  }

  productTotals = () => {
    const [{ sell: { cart, discount } }] = Object.values(this.context);
    const { renderCartDiscount, renderCartTotal } = this.props;
    const computedDiscountTotal = currencyFormatter(renderCartDiscount(cart, discount));
    const subTotal = renderCartTotal(cart);
    const computedSubTotal = currencyFormatter(subTotal);
    return { computedDiscountTotal, computedSubTotal, subTotal };
  }

  processReceiptData = ({ createSale }) => {
    const {
      receipt: { receiptNo },
      sale: { outlet: { outletRegister: { id }, business, outletcontactsSet } }
    } = createSale;
    const {
      tradingName, country, city,
      phoneNumber, addressLine1,
    } = business;
    this.outletContactInfo = new OutletContactInfo(outletcontactsSet);
    this.setState({
      receiptNo,
      registerID: id,
      tradingName,
      outletContactInfo: this.outletContactInfo,
      country,
      city,
      phoneNumber,
      addressLine1,
      loading: false,
      sale: true,
      processing: false,
    });
  };

  optimisticUpdate = () => {
    const { me: { activeOutlet, businessUser } } = this.props;
    const { tradingName } = businessUser || {};
    const {
      city: { name: cityName, country } = '',
      phoneNumber,
      addressLine1
    } = activeOutlet || {};
    const { name: countryName } = country || {};

    this.setState({
      barcodeUrl: OfflineBarCode,
      tradingName,
      country: countryName,
      city: cityName,
      phoneNumber,
      addressLine1,
      loading: false,
      sale: true,
      processing: false,
    });
  }

  handleSale = (createSale) => {
    const {
      cashCollected,
      cardCollected,
      transferCollected,
      changeDue,
    } = this.state;

    const [{
      sell: { mainCartNote },
      customers: { selectedCustomer }
    }] = Object.values(this.context);

    const {
      outletId,
      totalToPay,
      products,
    } = this.props;

    const totalCollected = cashCollected + cardCollected + transferCollected;

    this.setState({ loading: true });

    const mutationProducts = this.filterMutationProducts(products);

    const paymentsMade = [];

    if (cashCollected > 0) {
      paymentsMade.push({ paymentMethod: 'CASH', amount: cashCollected });
    }

    if (cardCollected > 0) {
      paymentsMade.push({ paymentMethod: 'CARD', amount: cardCollected });
    }

    if (transferCollected > 0) {
      paymentsMade.push({ paymentMethod: 'BANK_TRANSFER', amount: transferCollected });
    }

    const mutationVariables = {
      amountToPay: parseFloat(totalToPay),
      changeDue: parseFloat(changeDue),
      customerId: selectedCustomer ? selectedCustomer.id : null,
      discountTotal: parseFloat(this.productTotals().computedDiscountTotal),
      notes: mainCartNote,
      paymentsMade,
      outletId: Number(outletId),
      paidAmount: parseFloat(totalCollected),
      paymentMethod: 'Cash',
      subTotal: parseFloat(this.productTotals().subTotal),
      batches: mutationProducts
    };
    this.optimisticUpdate(products);
    notify('Sale was created successfully');
    createSale({
      variables: mutationVariables,
      optimisticResponse: {
        __typename: 'Mutation',
      }
    }).then((results) => {
      this.processReceiptData(results.data);
    }).catch((error) => {
      this.setState({ loading: false });
      notify(error.message.slice(15));
    });
  };

  closePaymentDialog = () => {
    const { handleClosePaymentDialog } = this.props;
    this.setState({
      ...this.initialState
    });
    handleClosePaymentDialog();
  }

  static contextType = StateContext;

  render() {
    const {
      cashChecked, cardChecked, bankChecked, processing, sale,
      cashRecieved, balanceDue, cashConfirmed,
      isNotesPopperOpen, anchorEl, placement, loading, barcodeUrl,
      receiptNo, registerID, tradingName, country, city,
      phoneNumber, addressLine1, addressLine2,
      cashCollected, cardCollected, transferCollected,
      changeDue
    } = this.state;

    const {
      renderCartTotal,
      renderCartDiscount,
      updateItems,
      currency,
      products,
      totalToPay,
      me
    } = this.props;

    const { outletpreference } = me.activeOutlet;
    const preferredPayMethod = outletpreference.paymentMethod;

    const cannotPay = totalToPay - (cashCollected + cardCollected + transferCollected) > 0;

    return (
      <OfflineMutation mutation={CREATE_SALE_MUTATION}>
        {createSale => (
          <SalesSummary
            me={me}
            updatedProducts={updateItems(products)}
            barcodeUrl={barcodeUrl}
            receiptNo={receiptNo}
            registerID={registerID}
            tradingName={tradingName}
            country={country}
            city={city}
            phoneNumber={phoneNumber}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            outletContactInfo={this.outletContactInfo}
            sale={sale}
            loading={loading}
            currency={currency}
            products={products}
            cashChecked={cashChecked}
            cardChecked={cardChecked}
            bankChecked={bankChecked}
            processing={processing}
            cashRecieved={cashRecieved}
            balanceDue={balanceDue}
            totalToPay={totalToPay}
            cashConfirmed={cashConfirmed}
            isNotesPopperOpen={isNotesPopperOpen}
            anchorEl={anchorEl}
            placement={placement}
            computedDiscount={this.productTotals().computedDiscountTotal}
            computedSubTotal={this.productTotals().computedSubTotal}
            handlePaymentType={this.handlePaymentType}
            handleSale={() => this.handleSale(createSale)}
            handleProcessing={this.handleProcessing}
            handleCashInput={this.handleCashInput}
            closePaymentDialog={this.closePaymentDialog}
            renderCartTotal={renderCartTotal}
            renderCartDiscount={renderCartDiscount}
            handleBackToSalesSummary={this.handleBackToSalesSummary}
            handleDisplayNotesPopper={this.handleDisplayNotesPopper}
            handleClosePopOver={this.handleClosePopOver}
            prefferedPayMethod={preferredPayMethod}
            handleCashCollectedInput={this.handleCashCollectedInput}
            handleCardCollectedInput={this.handleCardCollectedInput}
            handleTransferCollectedInput={this.handleTransferCollectedInput}
            cashCollected={cashCollected}
            cardCollected={cardCollected}
            transferCollected={transferCollected}
            changeDue={changeDue}
            cannotPay={cannotPay}
          />
        )}
      </OfflineMutation>
    );
  }
}

PaymentContainer.propTypes = {
  me: PropTypes.instanceOf(Object),
  currency: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  handleClosePaymentDialog: PropTypes.func.isRequired,
  renderCartTotal: PropTypes.func.isRequired,
  renderCartDiscount: PropTypes.func.isRequired,
  updateItems: PropTypes.func.isRequired,
  totalToPay: PropTypes.string.isRequired,
  outletId: PropTypes.string.isRequired,
};

PaymentContainer.defaultProps = {
  me: {},
};

export default withApollo(PaymentContainer);
