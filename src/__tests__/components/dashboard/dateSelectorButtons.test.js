import React from 'react';
import { shallow } from 'enzyme';
import DateSelectorButtons from '../../../components/dashboard/dateSelectorButtons';

const props = {
  active: 'date',
  classes: { },
  handleDateButtons: jest.fn()
};

describe('DateSelectorButtons', () => {
  const wrapper = shallow(
    <DateSelectorButtons {...props} />
  );
  it('renders without error', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Button))')
    expect(button.length).toBe(3);
  });
  it('handles "date" button', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Button))').at(0)
    button.simulate('click')
    expect(wrapper.props().handleDateButtons).toHaveBeenCalled;
  });
  it('handles "week" button', () => {
    const newProps = { ...props, active: 'week' }
    const wrapper = shallow(
      <DateSelectorButtons {...newProps} />
    );
    const button = wrapper.find('WithStyles(ForwardRef(Button))').at(1)
    button.simulate('click')
    expect(wrapper.props().handleDateButtons).toHaveBeenCalled;
  });
  it('handles "month" button', () => {
    const newProps = { ...props, active: 'month' }
    const wrapper = shallow(
      <DateSelectorButtons {...newProps} />
    );
    const button = wrapper.find('WithStyles(ForwardRef(Button))').at(2)
    button.simulate('click')
    expect(wrapper.props().handleDateButtons).toHaveBeenCalled;
  });
});
