import React from 'react';
import { shallow } from 'enzyme';
import { EditOrderDetails } from '../../../containers/orders/editOrderDetails';

const firstProps = {
  orderDetails: {
    name: 'Order for Feb',
    deliveryDate: '2020-02-10'
  },
  session: {
    me: {
      outlets: [
        {
          id: '1',
          kind: {
            name: 'warehouse'
          },
          name: 'any',
          users: [
            {
              email: 'someone@email.com',
              id: 'user1',
              jobTitle: 'cs',
              role: {
                id: 'role1',
                name: 'cashier'
              },
              username: 'someone'
            }
          ]
        }
      ]
    }
  },
  orderId: 10,
  outlet: { id: 5 },
  updateOrderDetails: jest.fn(() => Promise.resolve()),
};

const secondProps = {
  orderDetails: {
    name: 'Order for Feb',
    deliveryDate: '2020-02-10'
  },
  session: {
    me: {
      outlets: [
        {
          id: '1',
          kind: {
            name: 'warehouse'
          },
          name: 'any',
          users: [
            {
              email: 'someone@email.com',
              id: 'user1',
              jobTitle: 'cs',
              role: {
                id: 'role1',
                name: 'cashier'
              },
              username: 'someone'
            }
          ]
        }
      ]
    }
  },
  orderId: 10,
  oulet: 5,
  updateOrderDetails: jest.fn(() => Promise.reject()),
  handleNameChange: jest.fn()
};


describe('Test Orders Products Table Component', () => {
  const wrapper = shallow(<EditOrderDetails {...firstProps} />);
  it('should render the component', () => {
    const toolTip = wrapper.find('WithStyles(Component)').at(0);
    toolTip.props().onClickHandler();
    const CancelEditButton = wrapper.find('WithStyles(ForwardRef(Button))').at(0);
    wrapper.find('ForwardRef').simulate('change', "Fri Mar 20 2020 00:00:00 GMT+0200 (Central Africa Time)");
    wrapper.find('WithStyles(ForwardRef(TextField))').at(0).simulate('change', { target: { value: "" } });
    wrapper.find('WithStyles(ForwardRef(Select))').at(0).simulate('change', {target:{value:""}});
    CancelEditButton.simulate('click');
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should find the Cancel and Save Buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(2);
  });

  it('should find update the order details', () => {
    const saveButton = wrapper.find('WithStyles(ForwardRef(Button))').at(1);

    saveButton.simulate('click');
  });
});

describe('Test Promise Rejection Of The Delete And Generate Buttons', () => {
  const wrapper = shallow(<EditOrderDetails {...secondProps} />);

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should find the Cancel and Save Buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(2);
  });

  it('should find update the order details', () => {
    const saveButton = wrapper.find('WithStyles(ForwardRef(Button))').at(1);

    saveButton.simulate('click');
  });

  it('should find all text fields', () => {
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').length).toEqual(1);
  });

  it('should change the order name', () => {
    const orderName = wrapper.find('WithStyles(ForwardRef(TextField))').at(0);
    const event = {
      target: {
        value: 'Order for Feb'
      }
    };

    orderName.simulate('change', event);
  });
});
