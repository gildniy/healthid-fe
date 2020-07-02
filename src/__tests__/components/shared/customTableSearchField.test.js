import React from 'react';
import { mount, shallow } from 'enzyme';
import CustomTableSearchField from '../../../components/shared/customTableSearchField';

describe('Search Field', () => {
  const props = {
    state: {
      tableSearch: '',
    },
    handleChange: jest.fn(),
    styles: {}
  };
  const wrapper = shallow(<CustomTableSearchField {...props} />);

  it('renders without fail', () => {
    expect(wrapper.find('div')).toHaveLength(2);
  });
  it('handles change', () => {
    wrapper.find('input').props().onChange()
    expect(props.handleChange).toHaveBeenCalled;
  });
});
