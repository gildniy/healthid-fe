import React from 'react';
import { shallow } from 'enzyme';
import { ContactHeader } from '../../../../components/shared/customers/contactHeader';

describe('ContactHeader', () => {
  const props = {
    state: {
      selectedCustomer: {
        createdAt: '2019-07-31T14:15:14.151419+00:00',
        id: '1',
        firstName: 'John',
        lastName: 'Paul',
      }
    },
    renderDateRange: jest.fn(),
    handleEditSelectedCustomer: jest.fn()
  };
  const wrapper = shallow(<ContactHeader {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Grid))').length).toBe(5);
  });

  it('handles IconButton onClick', () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').simulate('click')
    expect(props.handleEditSelectedCustomer).toHaveBeenCalled();
  })
});
