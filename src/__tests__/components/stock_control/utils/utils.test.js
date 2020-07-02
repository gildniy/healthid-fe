import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomIconButton } from '../../../../components/stock_control/utils/utils';

describe('CustomIconButton ', () => {
  const props = {
    toolTip: '',
    buttonRef: {},
    onClickHandler: jest.fn(),
    children: [],
    classes: { iconWrapper: {}, IconButton: {} }
  };
  const event = {
    target: {}
  };
  const wrapper = mount(<CustomIconButton {...props} />);

  it('renders without crushing', () => {
    const button = wrapper.find('ForwardRef(IconButton)')
    expect(button.length).toBe(1)
  })
});
