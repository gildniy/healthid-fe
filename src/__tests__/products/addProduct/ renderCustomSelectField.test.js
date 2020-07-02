import React from 'react';
import { mount } from 'enzyme';
import {
  RenderCustomSelectField
} from '../../../components/shared/renderCustomSelectField';

describe('RenderCustomSelectField', () => {
  const props = {
    options: [{ id: 1, name: 'One' }],
    label: 'Two',
    value: 'New',
    handleOptionChange: jest.fn(),
  }

  const wrapper = mount(<RenderCustomSelectField {...props} />)
  it('renders correctly', () => {
    expect(wrapper.find('CustomSelectField').length).toEqual(1)
  })
});
