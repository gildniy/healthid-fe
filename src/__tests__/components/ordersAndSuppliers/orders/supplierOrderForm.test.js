import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MockComponent from '../../../../../__mocks__/mockComponent';
import OUTLET_PREFERENCES from '../../../../queries/outletPreferences';
import { SupplierOrderForm } from '../../../../components/ordersAndSuppliers/orders/SupplierOrderForm';
import { StateContext } from '../../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

SupplierOrderForm.contextTypes = [
  PropTypes.string,
  PropTypes.func
];

const props = {
  classes: {},
  history: { push: jest.fn() },
  orderItems: [{
    id: '9atdtw68gft',
    status: 'Incomplete Form...',
    supplier: {
      id: '1',
      supplierId: 'S-FIR281',
      name: 'Roche Pharmacy',
      suppliersmetaSet: [{
        creditDays: 2
      }]
    },
    order: {
      id: '2',
      name: 'Order for November',
      orderNumber: 'c9d8iro57',
      sentStatus: true,
      destinationOutlet: {
        id: 760
      }
    },
    quantity: 10,
    price: '3000',
    unitCost: '30000',
    product: {
      productName: 'Acetram'
    },
    deliveryDue: '',
    paymentDue: '',
  }],
  supplierOrderDetails: {
    id: '55nx0ducl',
    grandTotal: 9550.0,
    additionalNotes: 'supplier order notes \n this is a suplier order note for everything that happens in my comany',
    supplierOrderName: 'Roche Pharmacy-Order for November',
    supplierOrderNumber: 'c9d8iro57-S-FIR281',
    markedAsSent: false,
    status: 'PENDING',
    deliverTo: 'Lifestores Pharmacy. 21 Herbert Macaulay, Yaba, Lagos, Nigeria',
    deliveryDue: '2020-01-04',
    paymentDue: '2021-11-07'
  }
};
describe('renders supplier order form component component', () => {
  it('should render without error', async () => {
    const wrapper = shallow(<SupplierOrderForm {...props} />, { context });
    expect(wrapper.length).toBe(1);
  });

  it('should redirect to open orders if the order is open', async () => {
    const newProps = { ...props, history: { push: jest.fn() } };
    newProps.supplierOrderDetails.markedAsSent = true;
    const wrapper = shallow(<SupplierOrderForm {...newProps} />, { context });
    const { history } = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledWith('/orders/open');
  });

  it('should render call the handle change', async () => {
    const event = { target: { name: 'notes', value: 'additional notes' } };
    const wrapper = shallow(<SupplierOrderForm {...props} />, { context });
    wrapper.instance().handleChange(event);
    const { state } = wrapper.instance();
    expect(state.notes).toEqual('additional notes');
  });

  it('should place order successfully', async () => {
    const placeOrder = jest.fn(
      () => new Promise((resolve, reject) => {
        const data = {
          message: 'success'
        };
        const res = { data };
        return resolve(res);
      })
    );
    const wrapper = shallow(<SupplierOrderForm {...props} />, { context });
    wrapper.setProps({ placeOrder, history: { push: jest.fn() } });
    wrapper.instance().placeOrder();
    await wait(0);
    const { state } = wrapper.instance();
    expect(state.placing).toEqual(false);
  });

  it('should handle place order error', async () => {
    const markSupplierOrderAsSent = jest.fn(
      () => new Promise((resolve, reject) => {
        const data = {
          error: new Error('gpl error')
        };
        const error = { data };
        return reject(error);
      })
    );
    const wrapper1 = shallow(<SupplierOrderForm {...props} />, { context });
    wrapper1.setProps({ markSupplierOrderAsSent, history: { push: jest.fn() } });
    wrapper1.instance().placeOrder();
    await wait(1);
    const { state } = wrapper1.instance();
    const { history } = wrapper1.instance().props;
    expect(state.placing).toEqual(false);
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should cancel order successfully', async () => {
    const cancelOrder = jest.fn(
      () => new Promise((resolve) => {
        const data = {
          message: 'success'
        };
        const res = { data };
        return resolve(res);
      })
    );
    const wrapper2 = shallow(<SupplierOrderForm {...props} />, { context });
    wrapper2.setProps({ cancelOrder, orderId: 2, history: { push: jest.fn() } });
    wrapper2.instance().cancelOrder();
    await wait(0);
    const { state } = wrapper2.instance();
    const { history } = wrapper2.instance().props;
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(state.cancelling).toEqual(false);
  });

  it('should handle cancel order error', async () => {
    const cancelOrder = jest.fn(
      () => new Promise((resolve, reject) => {
        const error = new Error('gpl Error');
        const res = { error };
        return reject(res);
      })
    );
    const wrapper3 = shallow(<SupplierOrderForm {...props} />, { context });
    wrapper3.setProps({ cancelOrder, orderId: 2, history: { push: jest.fn() } });
    wrapper3.instance().cancelOrder();
    await wait(0);
    const { state } = wrapper3.instance();
    const { history } = wrapper3.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
    expect(state.cancelling).toEqual(false);
  });

  it('should handle enable the text notes filed on click', () => {
    const wrapper4 = shallow(<SupplierOrderForm {...props} />, { context });
    const notesField = wrapper4.find("[name='additionalNotes']");
    notesField.simulate('click');
    expect(wrapper4.instance().state.lock).toEqual(false);
  });

  it('save the order notes', async () => {
    const addOrderNotes = jest.fn(
      () => new Promise((resolve, reject) => {
        const data = { message: 'success' };
        const res = { data };
        return resolve(res);
      })
    );
    const wrapper4 = shallow(<SupplierOrderForm {...{ ...props, addOrderNotes }} />, { context });
    const notesField = wrapper4.find("[name='additionalNotes']");
    notesField.simulate('click');
    notesField.simulate('change', { target: { name: 'additionalNotes', value: 'this is a note for testing' } });
    const saveIcon = wrapper4.find('[name="saveNote"]');
    saveIcon.simulate('click');
    await wait(0);
    expect(wrapper4.instance().state.lock).toEqual(true);
  });

  it('should handle error while saving the order notes', async () => {
    const addOrderNotes = jest.fn(
      () => new Promise((resolve, reject) => {
        const error = { message: new Error('gpl Error') };
        const res = { error };
        return reject(res);
      })
    );
    const wrapper4 = shallow(<SupplierOrderForm {...{ ...props, addOrderNotes }} />, { context });
    const notesField = wrapper4.find("[name='additionalNotes']");
    notesField.simulate('click');
    notesField.simulate('change', { target: { name: 'additionalNotes', value: 'this is a note for testing' } });
    const saveIcon = wrapper4.find('[name="saveNote"]');
    saveIcon.simulate('click');
    await wait(0);
    expect(wrapper4.instance().state.lock).toEqual(false);
  });
});
