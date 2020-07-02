import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { SearchField } from '../../../../containers/orders/Template/SearchField';

const firstProps = {
  value: '',
  name: 'productName',
  searching: true,
  active: 'productName',
  handleChange: jest.fn(),
  errorText: '',
  styles: {},
  addProductToList: jest.fn(),
  popperClickAway: jest.fn(),
  openPopper: true,
  anchorEl: {},
  filteredProducts: [],
  placement: 'bottom',
  filteredSuppliers: [],
  assignSupplier: jest.fn()
};

const secondProps = {
  value: 'error',
  name: 'error',
  searching: false,
  active: 'error',
  handleChange: jest.fn(),
  errorText: 'error',
  styles: {},
  addProductToList: jest.fn(),
  popperClickAway: jest.fn(),
  openPopper: true,
  anchorEl: {},
  filteredProducts: [],
  placement: 'bottom',
  filteredSuppliers: [],
  assignSupplier: jest.fn()
};

describe('Test SearchField Component - Positive case', () => {
  let wrapper;
  beforeEach(() => {
    const mockClient = createMockClient();
    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <SearchField {...firstProps} />
      </ApolloProvider>
    );
  });
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should type in a product name', () => {
    const textField = wrapper.find('WithStyles(ForwardRef(Input))');
    textField.simulate('change', { value: 'panadol' });
  });
});

describe('Test SearchField Component - Negative case', () => {
  let wrapper;
  beforeEach(() => {
    const mockClient = createMockClient();
    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <SearchField {...secondProps} />
      </ApolloProvider>
    );
  });
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should type in a product name', () => {
    const textField = wrapper.find('WithStyles(ForwardRef(Input))');
    textField.simulate('change', { value: 'panadol' });
  });
});
