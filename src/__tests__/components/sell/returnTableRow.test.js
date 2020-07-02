import React from 'react';
import { shallow } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import ReturnTableRow from '../../../components/sell/returnTableRow';

const contextValues = {
  state: {},
  dispatch: jest.fn()
}
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

const props = { 
  item: {
    id: 1,
    productName: 'Panadol',
    salesPrice: 30,
    quantity: 2,
    discount: 1,
    dispensingSize: {name: 'Tin'}
  },
  currency: '',
  handleCartItemNote: jest.fn(),
  handleCartItemDelete: jest.fn(),
  calculateTotal: jest.fn(),
 }

describe('ReturnTableRow', () => {
  const wrapper = shallow((
    <ReturnTableRow {...props} />
  ));

  it('renders successfully', () => {
    expect(wrapper.find('WithStyles(ForwardRef(TableRow))').length).toBe(1);
  });
  it('handles CartItemDelete', () => {
    wrapper.find('TrashIcon').props().onClick()
    expect(props.handleCartItemDelete).toHaveBeenCalled;
  });
  it('handles ClickViewDetails', () => {
    wrapper.find('WithStyles(ReturnQuantity)').props().handleClickViewDetails()
    expect(contextValues.dispatch).toHaveBeenCalledTimes(2);
  });
});
