import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { GET_OUTLETS } from '../../../../queries/outletsQuery';
import { NewOrder } from '../../../../components/ordersAndSuppliers/orders/newOrder';
import { StateContext } from '../../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

NewOrder.contextTypes = [
  PropTypes.string,
  PropTypes.func
];

const props = {
  session: {
    me: {
      mobileNumber: '254123123123',
      email: 'user@gmail.com',
      username: 'user',
      role: { name: 'Master Admin' },
      activeOutlet: {
        outletpreference: {
          outletTimezone: { name: 'Africa/Lagos' }
        }
      }
    }
  },
  history: { push: jest.fn() },
  toISOString: jest.fn(),
  initiateOrder: jest.fn(
    () => new Promise((resolve) => {
      const data = {
        order: {
          name: 'Order for Jan'
        }
      };
      const res = { data };
      return resolve(res);
    })
  )
};
const component = (newProps) => {
  const allProps = { ...newProps, ...props };
  const wrapper = shallow(<NewOrder {...allProps} />, { context });
  return wrapper;
};

describe('Initiate new order', () => {
  it('should render the component successfully', () => {
    const wrapper = component();
    expect(wrapper.length).toBe(1);
  });

  it('should call handleChange function', () => {
    const wrapper = component();
    const event = { target: { name: 'name', value: 'Order for Jan' } };
    wrapper.instance().handleDateFocus(event);
    wrapper.instance().handleChange(event);
    const { state } = wrapper.instance();
    expect(state.name).toEqual('Order for Jan');
  });

  it('should call handleDateChange function', () => {
    const wrapper = component();
    const event = new Date('2020-02-28');
    wrapper.instance().handleDateChange(event);
    const { state } = wrapper.instance();
    expect(state.deliveryDate).toEqual('2020-02-28');
  });

  it('should load a spinner when the data is submitted', () => {
    const wrapper = component();
    wrapper.setState({ submitting: true });
    const loader = wrapper.find('[name="submitLoader"]');
    expect(loader.length).toBe(1);
  });

  it('should call handleSubmit function', async () => {
    const wrapper = component();
    const state = {
      deliveryDate: '2020-01-12',
      destinationOutlet: 'Lifestores',
      name: 'Order for June',
      productAutofill: true,
      supplierAutofill: true
    };
    const initiateOrder = jest.fn(
      () => new Promise((resolve) => {
        const data = {
          success: true
        };
        const res = { data };
        return resolve(res);
      })
    );
    wrapper.setState(state);
    wrapper.setProps({ initiateOrder, history: { push: jest.fn() } });
    await wrapper.instance().handleSubmit();
    const { history } = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should handle an error from the server after submitting', async () => {
    const wrapper = component();
    const state = {
      deliveryDate: '2020-01-12',
      destinationOutlet: 'Lifestores',
      name: 'Order for June',
      productAutofill: true,
      supplierAutofill: true
    };
    const initiateOrder = jest.fn(
      () => new Promise((resolve, reject) => {
        const data = {
          error: true
        };
        const res = { data };
        return reject(res);
      })
    );
    wrapper.setState(state);
    wrapper.setProps({ initiateOrder, history: { push: jest.fn() } });
    await wrapper.instance().handleSubmit();
    const { history } = wrapper.instance().props;
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should display a loader when fetching outlet operation is loading', async () => {
    const wrapper = component();
    const returnData = { loading: true, data: null, error: null };
    const results = await wrapper.instance().getOutlets(returnData);
    expect(results.props.size).toEqual(30);
  });

  it('should handle error while fetching (outlets) ', async () => {
    const wrapper = component();
    const returnData = { loading: false, data: null, error: { message: 'network error' } };
    const results = await wrapper.instance().getOutlets(returnData);
    expect(results.props.outlets[0].name).toEqual('Lifestores');
  });

  it('should handle Data (outlets) when they come ', async () => {
    const wrapper = component();
    const returnData = { loading: false, data: { me: { outlets: [{ name: 'Outlet1', id: 1 }] }, error: null } };
    const results = await wrapper.instance().getOutlets(returnData);
    expect(results.props.outlets[0].name).toEqual('Outlet1');
  });

  it('should handle date format', () => {
    const wrapper = component();
    const oneDigitMonth = '2020-1-1';
    const results = wrapper.instance().formatDate(oneDigitMonth);
    expect(results).toEqual('2020-01-01');
  });
  it('should handle date format', () => {
    const wrapper = component();
    const TwoDigitsMonth = '2020-11-12';
    const results = wrapper.instance().formatDate(TwoDigitsMonth);
    expect(results).toEqual('2020-11-12');
  });
});
