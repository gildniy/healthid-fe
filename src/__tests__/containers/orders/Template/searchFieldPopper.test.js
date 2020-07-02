import React from 'react';
import { mount } from 'enzyme';
import { SearchFieldPopper } from '../../../../containers/orders/Template/SearchFieldPopper';

const firstProps = {
  active: 'productName',
  styles: {
    productPopper: { marginTop: '3px' },
    supplierPopper: { marginTop: '5px' }
  },
  addProductToList: jest.fn(),
  handleAssignSupplier: jest.fn(),
  popperClickAway: jest.fn(),
  openPopper: true,
  anchorEl: {},
  placement: 'bottom',
  filteredProducts: [
    {
      id: '1',
      productName: 'Panadol',
      skuNumber: '001'
    },
    {
      id: '2',
      productName: 'Pure Skin Soap',
      skuNumber: '002'
    }
  ],
  filteredSuppliers: [],
  assignSupplier: jest.fn()
};

const secondProps = {
  active: 'product',
  styles: {
    productPopper: { marginTop: '3px' },
    supplierPopper: { marginTop: '5px' }
  },
  addProductToList: jest.fn(),
  handleAssignSupplier: jest.fn(),
  popperClickAway: jest.fn(),
  openPopper: true,
  anchorEl: {},
  placement: 'bottom',
  filteredProducts: [
    {
      id: '1',
      productName: 'Panadol',
      skuNumber: '001'
    },
    {
      id: '2',
      productName: 'Pure Skin Soap',
      skuNumber: '002'
    }
  ],
  filteredSuppliers: [
    {
      id: '1',
      suppliersmetaSet: [{
        displayName: 'halifax'
      }]
    },
    {
      id: '2',
      suppliersmetaSet: [{
        displayName: 'aci ltd'
      }]
    }
  ],
  assignSupplier: jest.fn()
};

describe('Test SearchFieldPopper Component - Case 1', () => {
  const wrapper = mount(<SearchFieldPopper {...firstProps} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should find the product and click on it', () => {
    const filteredProduct = wrapper.find('WithStyles(ForwardRef(ListItem))').at(0);
    filteredProduct.simulate('click');
  });
});

describe('Test SearchFieldPopper Component - Case 2', () => {
  const wrapper = mount(<SearchFieldPopper {...secondProps} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should find the product and click on it', () => {
    const filteredProduct = wrapper.find('WithStyles(ForwardRef(ListItem))').at(0);
    filteredProduct.simulate('click');
    expect(secondProps.handleAssignSupplier).toHaveBeenCalled;
  });
});
