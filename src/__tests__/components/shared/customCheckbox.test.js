import React from 'react';
import { mount, shallow } from 'enzyme';
import CustomCheckbox from '../../../components/shared/customCheckbox';

const props = {
  classes: {},
  label: '',
  checked: false,
  handleChange: jest.fn()
};
describe('CustomCheckbox', () => {
  const wrapper = mount(<CustomCheckbox {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.find('ForwardRef(Checkbox)').length).toBe(1);
  });
  it('renders checkbox icon button', () => {
    expect(wrapper.find('ForwardRef(IconButton)').length).toBe(1);
  });
});
