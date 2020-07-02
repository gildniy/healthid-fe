import React from 'react';
import { shallow } from 'enzyme';
import DateRangeSelector from '../../../components/dashboard/dateRangeSelector';

const props = {
  classes: { },
  range: '10.00pm',
  handleIconDateRange: jest.fn()
};

describe('DateRangeSelector', () => {
  const wrapper = shallow(
    <DateRangeSelector {...props} />
  );
  it('renders without error', () => {
    const text = wrapper.find('WithStyles(ForwardRef(Typography))').text()
    expect(text).toBe('10.00pm');
  });
  it('calls handleIconDateRange on Left button click', () => {
    wrapper.find('pure(ArrowLeftIcon)').simulate('click')
    expect(wrapper.props().handleIconDateRange).toHaveBeenCalled;
  });
  it('calls handleIconDateRange on Right button click', () => {
    wrapper.find('pure(ArrowRightIcon)').simulate('click')
    expect(wrapper.props().handleIconDateRange).toHaveBeenCalled;
  });
});
