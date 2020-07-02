import React from 'react';
import { mount } from 'enzyme';
import { AddCustomerPopper } from '../../../components/sell/addCustomerPopper';
import { StateContext } from '../../../providers/stateProvider';

const props = {
  handleAddNewCustomer: jest.fn(),
  renderSingleCustomer: jest.fn(),
};

const sell = {
  openCustomerPopper: true,
  customerAnchorEl: {},
  placement: 'bottom-end',
  filteredCustomers: [{ id: 1, name: '' }],
  name: 'John',
  customerFetchError: false
}

const context = [{ sell }, jest.fn()]

describe('AddCustomerPopper', () => {
  const wrapper = mount(
    <StateContext.Provider value={context}>
      <AddCustomerPopper {...props} />
    </StateContext.Provider>
  );
  it('renders without failure', () => {
    expect(wrapper.find('ForwardRef(Popper)').length).toBe(1);
  });
  it('handles CustomerPopperClickAway', () => {
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeTruthy;
    wrapper.find('ForwardRef(ClickAwayListener)').props().onClickAway()
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeFalsy;
  });
  it('calls handleAddNewCustomer', () => {
    wrapper.find('ForwardRef(Typography)').simulate('click')
    expect(props.handleAddNewCustomer).toHaveBeenCalled;
  });
});
