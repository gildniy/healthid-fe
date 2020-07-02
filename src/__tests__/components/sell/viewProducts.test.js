import React from 'react';
import { shallow } from 'enzyme';
import { ViewProducts } from '../../../components/sell/viewProducts';

const props = {
  state: { searchValue: 'new' },
  renderSearchBar: jest.fn(),
};
describe('ViewProducts', () => {
  const wrapper = shallow((
      <ViewProducts {...props} />
  ));

  it('renders successfully', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Grid))').length).toBe(2);
  });
});
