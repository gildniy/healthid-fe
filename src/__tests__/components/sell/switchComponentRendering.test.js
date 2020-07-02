import React from 'react';
import { shallow } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import { SwitchComponentRendering } from '../../../components/sell/switchComponentRendering';

const contextValues = {
  state: { 
    sell: {
      preferredProducts: [{
        productName: 'Panadol'
      }],
      currency: ''
    },
  },
  dispatch: jest.fn()
};
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

const state = {
  searchValue: 'pana',
  filteredProducts: [{
    node: { id: 1 }
  }],
}
const props = { state }

describe('SwitchComponentRendering', () => {
  const wrapper = shallow((
    <SwitchComponentRendering {...props} />
  ));

  it('renders "SearchList" successfully', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Paper))').length).toBe(1);
  });
  it('handles ClickViewDetails', () => {
    wrapper.find('SearchList').props().handleClickViewDetails()
    expect(wrapper.find(contextValues.dispatch)).toHaveBeenCalled;
  });
  it('renders error with no search products found', () => {
    wrapper.setProps({ state: { ...state, filteredProducts: [] } })
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').prop('children'))
      .toEqual('Unable to find products that match pana');
  });
  it('renders ProductCard successfully', () => {
    wrapper.setProps({ state: { filteredProducts: [] } })
    expect(wrapper.find('WithStyles(ProductCard)').length).toBe(1);
  });
});
