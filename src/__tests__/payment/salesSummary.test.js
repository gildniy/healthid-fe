import React from 'react';
import { mount } from 'enzyme';
import { Dialog } from '@material-ui/core';
import SalesSummary from '../../components/payment/salesSummary';
import { StateContext } from '../../providers/stateProvider';

const props = {
  classes: {},
  products: [{
    productName: 'Paracetamol',
    salesPrice: '500',
    quantity: 2,
    discount: 0,
    note: '',
    id: 23,
    discountedTotal: 1000,
    dispensingSize: 'tablets'
  }],
  updatedProducts: [{
    productName: 'Paracetamol',
    salesPrice: '500',
    quantity: 2,
    discount: 0,
    note: '',
    id: 23,
    discountedTotal: 1000,
    dispensingSize: { name: 'tablets' }
  }],
  me: {
    firstName: 'user',
    lastName: 'me-user',
    activeOutlet: {
      outletpreference: {
        paymentMethod: 'both'
      }
    }
  },
  loading: false,
  cashChecked: false,
  cardChecked: false,
  processing: false,
  sale: false,
  cashRecieved: '1000',
  balanceDue: 0,
  totalToPay: 1000,
  cashConfirmed: true,
  currency: '$',
  discount: 0,
  isNotesPopperOpen: false,
  anchorEl: { id: '' },
  placement: 'bottom',
  mainCartNote: 'test note',
  isConfirmPopperOpen: false,
  confirmAnchorEl: { id: '' },
  confirmPlacement: 'top',
  computedSubTotal: '1000',
  computedDiscount: '0',
  updateItems: jest.fn(),
  barcodeUrl: '',
  receiptNo: '2345',
  registerID: '34',
  tradingName: '',
  country: 'uganda',
  city: 'kampala',
  phoneNumber: '234567890',
  addressLine1: 'plot 34 rubaga',
  handleSale: jest.fn(),
  handleClosePaymentDialog: jest.fn(),
  handleProcessing: jest.fn(),
  handlePaymentType: jest.fn(),
  handleCashInput: jest.fn(),
  handleBackToSalesSummary: jest.fn(),
  handleDisplayNotesPopper: jest.fn(),
  handleClosePopOver: jest.fn(),
  handleDisplayConfirmPopOver: jest.fn(),
  handleCloseConfirmPopOver: jest.fn(),
  handleBackToSellScreen: jest.fn()
};

const sell = {
  openPaymentDialog: true,
  mainCartNote: '',
  discount : 10
}

const context = [{ sell }, jest.fn()]

describe('salesSummary', () => {
  const wrapper = mount((
    <StateContext.Provider value={context}>
      <SalesSummary {...props} />
  </StateContext.Provider>
  ));

  it('it renders correctly', () => {
    expect(wrapper.find(Dialog).length).toEqual(1);
  });
});
