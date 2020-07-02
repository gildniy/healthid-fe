import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { EDIT_LOYALTY } from '../../../mutations/pricingLoyalty/pricingLoyalty';
import { StateContext } from '../../../providers/stateProvider';
import { EditLoyaltyPopper } from '../../../components/pricing_loyalty/editLoyaltyPopper';

const contextValues = {
  state: {
    pricing: {
      selectedRows: [{
        id: 1,
        markup: 10,
        salesPrice: 50
      }],
      selected: []
    }
  },
  dispatch: jest.fn()
};

const props = {
  anchorEl: {},
  open: true,
  handleCloseLoyalty: jest.fn(),
  handleClickDeselectAll: jest.fn()
}

describe('EditLoyaltyPopper ', () => {
  const mockClient = createMockClient();
  const returnHandler = jest.fn()
    .mockResolvedValue({ data: { productLoyaltyWeightUpdate: { message: 'done' } } });
  mockClient.setRequestHandler(EDIT_LOYALTY, returnHandler);

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <StateContext.Provider value={contextValues}>
        <EditLoyaltyPopper {...props} />
      </StateContext.Provider>
    </ApolloProvider>
  );

  it('renders without crashing', () => {
    expect(wrapper.find('ForwardRef(Popper)').length).toBe(1);
  });
  it('handles LoyaltyChange', () => {
    let event = {target: {value: 'pp'}}
    wrapper.find('ForwardRef(Input)').props().onChange(event)
    wrapper.update();
    expect(wrapper.find('ForwardRef(Input)').prop('value')).toBeFalsy;
    event = {target: {value: 10}}
    wrapper.find('ForwardRef(Input)').props().onChange(event)
    wrapper.update();
    expect(wrapper.find('ForwardRef(Input)').prop('value')).toBe(10);
  });
  it('handles BtnChange', () => {
    let action = 'add'
    wrapper.find('CustomIncrementDecrement').props().handleBtnChange(action);
    wrapper.update()
    expect(wrapper.find('ForwardRef(Input)').at(0).props().value).toBe("11");
    action = 'remove'
    wrapper.find('CustomIncrementDecrement').props().handleBtnChange(action);
    wrapper.update()
    expect(wrapper.find('ForwardRef(Input)').at(0).props().value).toBe("10");
  });
  it('handles Update', () => {
    wrapper.find('CustomHeader').props().handleUpdate();
    expect(wrapper.props('handleCloseLoyalty')).toHaveBeenCalled;
  });
});
