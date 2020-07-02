import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { EDIT_PRICING } from '../../../mutations/pricingLoyalty/pricingLoyalty';
import { StateContext } from '../../../providers/stateProvider';
import { EditPricingPopper } from '../../../components/pricing_loyalty/editPricingPopper';

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
  handleClosePricing: jest.fn(),
  handleClickDeselectAll: jest.fn()
}

describe('EditPricingPopper ', () => {
  const mockClient = createMockClient();
  const returnHandler = jest.fn()
    .mockResolvedValue({ data: { updatePrice: { message: 'done' } } });
  mockClient.setRequestHandler(EDIT_PRICING, returnHandler);

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <StateContext.Provider value={contextValues}>
        <EditPricingPopper {...props} />
      </StateContext.Provider>
    </ApolloProvider>
  );

  it('renders without crashing', () => {
    expect(wrapper.find('ForwardRef(Popper)').length).toBe(1);
  });
  it('handles onChange', () => {
    const event = {target: {value: 'markup', name: 'markup'}}
    wrapper.find('[className="pricing-popper__radio markup-rd"]').at(0).props().onChange(event)
    expect(
      wrapper.find('[className="pricing-popper__radio markup-rd"]')
        .at(0).prop('checked')
    ).toBeTruthy;
  });
  it('handles InputChange', () => {
    let event = {target: {value: 10, name: 'markup'}}
    wrapper.find('[className="pricing-popper__markup"]').at(0).props().onChange(event)
    expect(
      wrapper.find('[className="pricing-popper__markup"]')
        .at(0).props().value
    ).toBe(10);
    wrapper.find('[className="pricing-popper__input pricing"]').at(0).props().onChange(event)
    expect(
      wrapper.find('[className="pricing-popper__markup"]')
        .at(0).props().value
    ).toBe(10);
    event = {target: {value: 10, name: 'price'}}
    wrapper.find('[className="pricing-popper__markup"]').at(0).props().onChange(event)
    expect(
      wrapper.find('[className="pricing-popper__radio"]')
        .at(0).prop('checked')
    ).toBeTruthy;
  });
  it('handles BtnChange', () => {
    let action = 'add'
    wrapper.find('CustomIncrementDecrement').props().handleBtnChange(action);
    wrapper.update()
    expect(
      wrapper.find('[className="pricing-popper__markup"]')
        .at(0).props().value
    ).toBe("11");
    action = 'remove'
    wrapper.find('CustomIncrementDecrement').props().handleBtnChange(action);
    wrapper.update()
    expect(
      wrapper.find('[className="pricing-popper__markup"]')
        .at(0).props().value
    ).toBe("10");
  });
  it('handles Update', () => {
    wrapper.find('CustomHeader').props().handleUpdate();
    const event = {target: {value: 10, name: 'price'}}
    wrapper.find('[className="pricing-popper__markup"]').at(0).props().onChange(event)
    wrapper.update();
    wrapper.find('CustomHeader').props().handleUpdate();
  });
});
