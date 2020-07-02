import React from 'react';
import { shallow, mount } from 'enzyme';
import MockComponent from '../../../../__mocks__/mockComponent';
import { StateContext } from '../../../providers/stateProvider';
import { SelectionToolBar } from '../../../components/pricing_loyalty/Table/SelectionToolBar';

jest.mock('../../../components/pricing_loyalty/editLoyaltyPopper', () => MockComponent);
jest.mock('../../../components/pricing_loyalty/editPricingPopper', () => MockComponent);

const props = {
  handleClickDeselectAll: jest.fn(),
  isAdmin: true,
  handleClickInverseSelection: jest.fn(),
};
const event = {
  stopPropagation: jest.fn(),
  currentTarget: {
    innerText: 1
  },
  target: {
    value: 'panadol'
  }
};

describe('SelectionToolBar ', () => {
  const wrapper = shallow(<SelectionToolBar {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
  it('handles clicks', () => {
    wrapper.find('[toolTip="Edit pricing"]').props().onClickHandler();
    wrapper.find('[toolTip="Edit loyalty"]').props().onClickHandler();
    wrapper.find('[toolTip="Edit loyalty"]').props().onClickHandler();
  })
});
