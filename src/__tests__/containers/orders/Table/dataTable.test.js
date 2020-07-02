import React from 'react';
import { shallow } from 'enzyme';
import { DataTable } from '../../../../containers/orders/Table/DataTable';

describe('Test Order Products Data Table Component', () => {
  const props = {
    selectedRow: [{
      name: 'something',
      sku: 234,
      quantity: 50,
      currentSupplierId: 'someone',
      currentSupplierName: 'ACI Ltd',
      preferredSupplierId: 'anything',
      preferredSupplierName: 'someone',
      backupSupplierId: 'someone',
      backupSupplierName: 'someone',
    }],
    data: [{
      id: '209',
      skuNumber: 459,
      autofillQuantity: 107,
      product: {
        id: '459',
        productName: 'Broncholyte Elixir 4mg/5ml Syrup 100ml'
      },
      currentSupplier: {
        id: '7y4l8bt35',
        name: 'Bender Ltd'
      },
      preferredSupplier: {
        id: '7y4l8bt35',
        name: 'Bender Ltd'
      },
      backupSupplier: {
        id: 'msxcvuyna',
        name: 'Bartlett Sales'
      },
      productUnitPrice: 150
    },
    {
      id: '208',
      skuNumber: 458,
      autofillQuantity: 106,
      product: {
        id: '458',
        productName: 'Graxyl Elixir 5mg/6ml Syrup 200ml'
      },
      currentSupplier: {
        id: '7y4l8bt35',
        name: 'Bender Ltd'
      },
      preferredSupplier: {
        id: '7y4l8bt35',
        name: 'ACI Ltd'
      },
      backupSupplier: {
        id: 'msxcjsyna',
        name: 'Dunn LTD'
      },
      productUnitPrice: 200
    }]
  };

  const event = {
    stopPropagation: jest.fn()
  };

  it('should render the component', () => {
    const wrapper = shallow(<DataTable {...props} />);
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should select products', () => {
    const wrapper = shallow(<DataTable {...props} />);
    wrapper.find('[role="checkbox"]').at(0).simulate('click');
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(true);
  });
});
