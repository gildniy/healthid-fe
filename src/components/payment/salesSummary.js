import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Divider, Zoom, Table, TableBody
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaymentSummary from './paymentSummary';
import Notes from './notesPopOver';
import PaymentButton from './paymentButton';
import RecieptScreen from './recieptScreen';
import currencyFormatter from './utils/formatter';
import RenderTableHeader from './tableHeader';
import ProductsToSaleList from './productsToSaleList';
import DialogHeader from './dialogTitle';
import ProductTotalsSection from './productTotalsSection';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

import { useStateValue } from '../../providers/stateProvider';

const SalesSummary = (props) => {
  const {
    classes,
    products,
    me,
    loading,
    cashChecked,
    cardChecked,
    bankChecked,
    processing,
    sale,
    cashRecieved,
    balanceDue,
    changeDue,
    totalToPay,
    cashConfirmed,
    currency,
    isNotesPopperOpen,
    anchorEl,
    placement,
    computedSubTotal,
    computedDiscount,
    barcodeUrl,
    receiptNo,
    registerID,
    tradingName,
    country,
    city,
    phoneNumber,
    addressLine1,
    outletContactInfo,
    updatedProducts,
    handleSale,
    closePaymentDialog,
    handleProcessing,
    handlePaymentType,
    handleCashInput,
    handleBackToSalesSummary,
    handleDisplayNotesPopper,
    handleClosePopOver,
    prefferedPayMethod,
    handleCashCollectedInput,
    handleCardCollectedInput,
    handleTransferCollectedInput,
    cannotPay,
    cashCollected,
    cardCollected,
    transferCollected
  } = props;

  const [{
    sell: { openPaymentDialog, mainCartNote, discount }
  }] = Object.values(useStateValue());

  const computedTotal = currencyFormatter(totalToPay);

  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openPaymentDialog}
        TransitionComponent={Zoom}
      >
        {!sale && (
          <DialogHeader
            processing={processing}
            handleBackToSalesSummary={handleBackToSalesSummary}
            handleDisplayNotesPopper={handleDisplayNotesPopper}
          />
        )}
        {sale && (
          <RecieptScreen
            me={me}
            barcodeUrl={barcodeUrl}
            receiptNo={receiptNo}
            registerID={registerID}
            tradingName={tradingName}
            country={country}
            city={city}
            outletContactInfo={outletContactInfo}
            phoneNumber={phoneNumber}
            addressLine1={addressLine1}
            products={updatedProducts}
            cashRecieved={cashRecieved}
            balanceDue={balanceDue}
            computedSubTotal={computedSubTotal}
            computedDiscount={computedDiscount}
            computedTotal={computedTotal}
            closePaymentDialog={closePaymentDialog}
            cashCollected={cashCollected}
            cardCollected={cardCollected}
            transferCollected={transferCollected}
            changeDue={changeDue}
          />
        )}
        {processing && <Divider />}
        {processing ? (
          <PaymentSummary
            currency={currency}
            cashRecieved={cashRecieved}
            balanceDue={balanceDue}
            totalToPay={computedTotal}
            handleCashInput={handleCashInput}
            cashChecked={cashChecked}
            cardChecked={cardChecked}
            bankChecked={bankChecked}
            prefferedPayMethod={prefferedPayMethod}
          />
        ) : !sale && (
          <Fragment>
            <RenderTableHeader />
            <div
              className={classes.tableBodyDiv}
              style={{
                backgroundColor: '#e8e8e8'
              }}
            >
              <Table className={classes.dialogTable}>
                <colgroup>
                  <col className={classes.dialogTableColumn1} />
                  <col className={classes.dialogTableColumn2} />
                  <col className={classes.dialogTableColumn3} />
                  <col className={classes.dialogTableColumn4} />
                  <col className={classes.dialogTableColumn5} />
                </colgroup>
                <TableBody>
                  {updatedProducts.map(
                    product => (
                      <ProductsToSaleList
                        key={product.productName}
                        product={product}
                        currency={currency}
                      />
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </Fragment>
        )}
        {!sale && <Divider />}
        {!sale && !processing && (
          <ProductTotalsSection
            discount={Number(discount)}
            me={me}
            currency={currency}
            computedTotal={computedTotal}
            computedSubTotal={computedSubTotal}
            computedDiscount={computedDiscount}
            handleCashCollectedInput={handleCashCollectedInput}
            handleCardCollectedInput={handleCardCollectedInput}
            handleTransferCollectedInput={handleTransferCollectedInput}
            change={changeDue}
            balance={balanceDue}
          />
        )}

        {
          !sale && (
            <PaymentButton
              sale={sale}
              loading={loading}
              handleSale={handleSale}
              cannotPay={cannotPay}
            />
          )
        }

        <Notes
          anchorEl={anchorEl}
          placement={placement}
          products={products}
          mainCartNote={mainCartNote}
          isNotesPopperOpen={isNotesPopperOpen}
          handleClosePopOver={handleClosePopOver}
        />
      </Dialog>
    </div>
  );
};

SalesSummary.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  me: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  cashChecked: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  bankChecked: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  sale: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  totalToPay: PropTypes.string.isRequired,
  balanceDue: PropTypes.number.isRequired,
  cashRecieved: PropTypes.string.isRequired,
  cashConfirmed: PropTypes.bool.isRequired,
  isNotesPopperOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  placement: PropTypes.string.isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  barcodeUrl: PropTypes.string.isRequired,
  receiptNo: PropTypes.string.isRequired,
  registerID: PropTypes.string,
  tradingName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
  updatedProducts: PropTypes.arrayOf(Object),
  handleSale: PropTypes.func.isRequired,
  closePaymentDialog: PropTypes.func.isRequired,
  handleProcessing: PropTypes.func.isRequired,
  handlePaymentType: PropTypes.func.isRequired,
  handleCashInput: PropTypes.func.isRequired,
  handleBackToSalesSummary: PropTypes.func.isRequired,
  handleDisplayNotesPopper: PropTypes.func.isRequired,
  handleClosePopOver: PropTypes.func.isRequired,
  outletContactInfo: PropTypes.instanceOf(Object).isRequired,
  prefferedPayMethod: PropTypes.string.isRequired,
};

SalesSummary.defaultProps = {
  registerID: '',
  updatedProducts: [{}]
};

export default withStyles(salesDialogStyles)(SalesSummary);
