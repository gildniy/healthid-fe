import React from 'react';
import { mount } from 'enzyme';
import CustomPhoneField from '../components/shared/customPhoneField';

const props = {
  handleChange: jest.fn(),
  value: '',
  label: '',
  styles: {}
};

describe('CustomPhoneField', () => {
  const wrapper = mount(<CustomPhoneField {...props} />);
  it('renders without crashing', () => {
    expect(wrapper.find('Grid').length).toBe(0);
  });
  it('renders with provided classes', () => {
    const inputStyles = { width: '10px' }
    wrapper.setProps({ styles: { inputStyles } })
    expect(wrapper.find('input').length).toBe(1);
  });
});
