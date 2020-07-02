import React from 'react';
import { shallow } from 'enzyme';
import ActionButtons from '../../../components/products/ImportProduct/Inputs/ActionButtons';

describe('Render Action Buttons component', () => {
  it('renders action buttons', () => {
    const props = {
      handleCloseEditDuplicates: jest.fn(),
      handleEditProduct: jest.fn()
    };
    const wrapper = shallow(<ActionButtons {...props} />);
    expect(wrapper.find('.new-btn').length).toBe(1);
    expect(wrapper.find('.create-btn').length).toBe(1);
  });
});
