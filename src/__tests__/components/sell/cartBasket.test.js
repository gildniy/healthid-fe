import React from 'react';
import { shallow } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import { CartBasket } from '../../../components/sell/cartBasket';

const contextValues = {
  state: { 
    sell: {
      currency: '',
      cart: [{ id: 1}]
    },
  },
  dispatch: jest.fn()
};
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

describe('ViewProducts', () => {
  const wrapper = shallow((
      <CartBasket />
  ));
  it('renders successfully', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Paper))').length).toBe(1);
  });
  it('handles cartItemNote', () => {
    const event = { currentTarget : {}}
    wrapper.find('ReturnTableRow').props().handleCartItemNote(event)
    expect(contextValues.dispatch).toHaveBeenCalled
  });
  it('handles CartItemDelete', () => {
    wrapper.find('ReturnTableRow').props().handleCartItemDelete()
    expect(contextValues.dispatch).toHaveBeenCalled
  });
  it('handles calculateTotal', () => {
    wrapper.find('ReturnTableRow').props().calculateTotal()
    expect(contextValues.dispatch).toHaveBeenCalled
  });
});