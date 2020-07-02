import React from 'react';
import { mount } from 'enzyme';
import SalesOnHoldDialog from '../../../components/sell/salesOnHoldDialog';
import { StateContext } from '../../../providers/stateProvider';

const sell = {
  salesOnHold: [{
    note: '',
    cart: [
      { id: 1, image: '', productName: '', quantity: 10 },
      { id: 2, image: '', productName: '', quantity: 10 },
      { id: 3, image: '', productName: '', quantity: 10 },
      { id: 4, image: '', productName: '', quantity: 10 },
    ]
  }],
  openSalesOnHoldDialog: true
}

const context = [{ sell }, jest.fn()]

describe('SalesOnHoldDialog', () => {
  const wrapper = mount(
    <StateContext.Provider value={context}>
      <SalesOnHoldDialog />
    </StateContext.Provider>
  );
  it('renders SalesOnHoldDialog component', () => {
    expect(wrapper.find('ForwardRef(Dialog)').length).toBe(1);
  });
  it('handles ReturnSaleToCart', () => {
    wrapper.find('ForwardRef(ListItem)').props().onClick
    expect(context[1]).toHaveBeenCalled
  });
});
