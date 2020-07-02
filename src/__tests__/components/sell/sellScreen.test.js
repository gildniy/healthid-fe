import React from 'react';
import { shallow } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import { SellScreen } from '../../../components/sell/sellScreen';

const contextValues = {
  state: { 
    sell: {
      cart: [{ id: 1 }],
      discount: 10,
      currency: '',
      mainCartNote: ''
    },
    customers: { selectedCustomer: '' }
  },
  dispatch: jest.fn()
};
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

const props = {
  state: {
    buyingForValue: '',
  },
  handleChange: jest.fn(),
  handleNoteInPutChange: jest.fn(),
  handleDiscardSaleButton: jest.fn(),
  handleHoldSaleButton: jest.fn(),
  handleSalesOnHoldButton: jest.fn(),
  handleDiscountClick: jest.fn(),
  handleAddNewCustomer: jest.fn(),
  renderSingleCustomer: jest.fn(),
  renderCartTotal: jest.fn(),
  renderCartDiscount: jest.fn(),
  renderGrandTotal: jest.fn(),
  updateCustomers: jest.fn(),
  renderSearchBar: jest.fn(),
  handleClickToPay: jest.fn(),
  renderBatchQuantity: jest.fn(),
};
describe('sellScreen component', () => {
  const wrapper = shallow((
    <SellScreen {...props} />
  ));
  it('it renders the sellScreen component', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Paper))').length).toBe(1);
  });
});
