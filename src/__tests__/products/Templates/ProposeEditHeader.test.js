import React from 'react';
import { shallow } from 'enzyme';
import ProposeEditHeader from '../../../components/products/Templates/ProposeEditHeader';

describe('Render ProposeEditHeader component', () => {
  const props = {
    classes: {},
    previousPage: '',
    children: <></>
  }
  const wrapper = shallow(<ProposeEditHeader {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
