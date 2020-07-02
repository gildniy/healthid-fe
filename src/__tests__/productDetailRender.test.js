import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import _ from '../../__mocks__/mockUseContext';
import ProductDetailRender from '../components/products/productDetailRender';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

const props = {
  product: {
    id: 1,
    productName: '',
    skuNumber: 1,
    salesPrice: 5,
    dispensingSize: {
      name: '',
    },
    image: 'none',
    manufacturer: '',
    productCategory: {
      name: ''
    },
    description: '',
    brand: '',
    vatStatus: false,
    nearestExpiryDate: '12/11/2021',
    preferredSupplier: {
      name: ''
    },
    loyaltyWeight: 10,
    backupSupplier: {
      name: '',
    },
    tags: ['tag1', 'tag2'],
    batchInfo: [{
      id: '12ew',
      quantityReceived: 1,
      batchNo: "1232-213123",
      packSize: 1,
      dateReceived: 1,
      unitCost: 1,
      supplier: {
        name: '',
      },
      expiryDate: 1,
      commentary: '',
    }],
    business: {
      outletSet: [{
        outletpreference: {
          outletCurrency: {
            symbol: "₦"
          }
        }
      }]
    },
    quantityInStock: 1
  },
  classes: {},
  session: {
    me: {
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  }
};

describe.only('render ProductDetailRender component', () => {
  const wrapper = mount(
    <BrowserRouter> 
      <ProductDetailRender {...props} />
    </BrowserRouter>
  );
  it('renders 16 textfields', () => {
    expect(wrapper.find('ForwardRef(TextField)').length).toBe(16);
  });
});
