import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { OrdersList } from '../../../containers/orders/OrdersList';

const props = {
  order: {
    name: 'Order for Jan 2020 TEST TEST TEST',
    id: '84',
    orderNumber: 'bagd6te3b',
    productAutofill: true,
    supplierAutofill: true,
    destinationOutlet: {
      name: 'Somewhere'
    },
    orderItems: [{
      id: '209',
      quantity: 107,
      product: {
        id: '459',
        skuNumber: 459,
        productName: 'Broncholyte Elixir 4mg/5ml Syrup 100ml',
        quantityInStock: 0
      },
      supplier: {
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
      unitCost: null
    }]
  },
  cancelOrder: jest.fn(() => Promise.reject()),
  deleteInitiatedOrder: jest.fn(() => Promise.reject())
};

OrdersList.contextTypes = [PropTypes.Bool, PropTypes.func];

const context = [true, jest.fn()];

describe('Test Order Product Table Component', () => {
  const wrapper = shallow(<OrdersList {...props} />, { context });
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should find the BackArrow, Delete and Generate Buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(3);
  });

  it('should delete the order', () => {
    const spyDelete = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.instance().handleDelete();
    expect(spyDelete).toHaveBeenCalled();
  });
});

describe('Test Promise Rejection Of The Delete And Generate Buttons', () => {
  const wrapper = shallow(<OrdersList {...props} />, { context });
  it('should not delete the order', () => {
    const spyDelete = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.instance().handleDelete();
    expect(spyDelete).toHaveBeenCalled();
  });
});
