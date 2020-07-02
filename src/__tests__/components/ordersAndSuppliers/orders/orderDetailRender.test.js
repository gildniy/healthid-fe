import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import * as AppContext from '../../../../providers/stateProvider';
import OrderDetailRender from '../../../../components/ordersAndSuppliers/orderDetailRender';
import UPLOAD_IMAGE from '../../../../mutations/uploadImage';
import CLOSE_ORDER from '../../../../mutations/closeOrder';
import { StateContext } from '../../../../providers/stateProvider';
import {
  props, props1, openOrderDescriptionProps, orderMockContext
} from '../../../../../__mocks__/OrderPropsMock';

const contextValues = [ orderMockContext, jest.fn() ];
const context = {
  state: orderMockContext,
  dispatch: jest.fn()
};

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

describe('renders OrderDetailRender component', () => {
  const mockClient = createMockClient();
  describe('view closed order description', () => {
    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <OrderDetailRender {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    );
    it('should render without error', async () => {
      await wait(0);
      wrapper.find('ForwardRef(IconButton)').at(4).simulate('click');
      // wrapper.find('ForwardRef(Button)').at(3).simulate('click');
      wrapper.find('ForwardRef(IconButton)').at(3).simulate('click');
      expect(wrapper).toHaveLength(1);
    });
    it('should print an invoice', async () => {
      const wrapper = mount(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <StateContext.Provider value={context}>
              <OrderDetailRender {...props1} />
            </StateContext.Provider>
          </BrowserRouter>
        </ApolloProvider>
      );
      await wait(0);
      wrapper.find('ForwardRef(Button)[name="viewButton"]').simulate('click');
      expect(wrapper.find('ForwardRef(Button)[name="closeButton"]')).toHaveLength(1);
      wrapper.find('ForwardRef(Button)[name="closeButton"]').simulate('click');
      expect(wrapper.find('OrderDetailRender').length).toBe(1);
    });
  });
  describe('view open order description', () => {
    let wrapper;
    const uploadImage = {
      invoice: { id: '5' },
      message: 'hey'
    };

    it('should render for an open order', async () => {
      wrapper = mount(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <StateContext.Provider value={context}>
              <OrderDetailRender {...openOrderDescriptionProps} />
            </StateContext.Provider>
          </BrowserRouter>
        </ApolloProvider>
      );
      await wait(0);
      wrapper.find('ForwardRef(Button)[name="uploadButton"]').simulate('click');
      expect(wrapper.find('UploadInvoice')).toHaveLength(1);
    });
  });
  describe('Close an Open Order', () => {
    let wrapper;

    it('should close  an open order', async () => {
      wrapper = mount(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <StateContext.Provider value={context}>
              <OrderDetailRender {...openOrderDescriptionProps} />
            </StateContext.Provider>
          </BrowserRouter>
        </ApolloProvider>, { context: orderMockContext}
      );
      await wait(0);
      wrapper.find('ForwardRef(Button)[name="closeOrder"]').simulate('click');
      expect(wrapper.find('OrderDetailRender').length).toBe(1);
    });
  });
});
