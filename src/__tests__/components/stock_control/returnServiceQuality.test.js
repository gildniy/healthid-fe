import React from 'react';
import { mount } from 'enzyme';
import ServiceQuality from '../../../components/stock_control/returnServiceQuality';

describe('Service Quality Page ', () => {
  it(' Render successfully ', () => {
    const props = {
      handleServiceButtons: jest.fn(),
      serviceQuality: 2,
      styles: {},
      classes: {}
    };
    const wrapper = mount(
      <ServiceQuality {...props} />
    );
    expect(wrapper).toHaveLength(1);
  });
  it(' Render successfully ', () => {
    const props = {
      handleServiceButtons: jest.fn(),
      serviceQuality: '',
      styles: {},
      classes: {}
    };
    const wrapper = mount(
      <ServiceQuality {...props} />
    );
    expect(wrapper).toHaveLength(1);
    const icon = wrapper.find('ForwardRef(IconButton)').at(0)
    icon.simulate('click');
    expect(icon).toHaveLength(1);
  });
});
