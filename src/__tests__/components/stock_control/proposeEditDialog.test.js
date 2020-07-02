import React from 'react';
import { shallow, mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import PropTypes from 'prop-types';
import { StateContext } from '../../../providers/stateProvider';
import { EDIT_QUANTITY } from '../../../mutations/stockControl';
import ProposeEditDialog from '../../../components/stock_control/proposeEditDialog';

const props = {
  data: {
    id: 1,
    name: 'Panadol',
    batchId: [{
      id: 5,
      expiryDate: '123',
      batchQuantities: [{ quantityRemaining: 10 }]
    }]
  },
  handleClickDeselectAll: jest.fn()
};

const context = [{
  stock: {
    batchQuantities: [{id: 1, quantities: [10, 20]}],
    openDialog: true,
    isLoading: false
  }
}, jest.fn()]

describe('ProposeEditDialog ', () => {
  ProposeEditDialog.contextTypes = [
    PropTypes.object,
    PropTypes.func
  ];
  const wrapper = shallow(<ProposeEditDialog {...props} />, { context });

  it('renders without error', () => {
    expect(wrapper.find('Mutation').length).toBe(1);
  });
  it('handle BatchInputChange', () => {
    const id = 1;
    const quantity = 20;
    wrapper.instance().handleBatchInputChange(id, quantity);
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });

  describe('handle Click', () => {
    it('without error', () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleDialogClose')
      const funcMock = () => new Promise((resolve) => {
        resolve({ data: { proposedQuantity: { notification: 'done' } } });
      });
      const proposedQuantity = () => funcMock()
      wrapper.instance().handleClick(proposedQuantity);
      expect(wrapper.context()[1]).toHaveBeenCalled;
      expect(spy).toHaveBeenCalled;
    });
    it('with error', () => {
      const funcMock = () => new Promise((error) => {
        error({ message: 'error: this is the error   '});
      });
      const proposedQuantity = () => funcMock()
      wrapper.instance().handleClick(proposedQuantity);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
  })
});

describe('ProposeEditDialog with Mutation ', () => {
  const mockClient = createMockClient();
  const returnHandler = jest.fn()
    .mockResolvedValue({ data: { proposedQuantity: { notification: 'done' } } });
  mockClient.setRequestHandler(EDIT_QUANTITY, returnHandler);
  
  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <StateContext.Provider value={context}>
        <ProposeEditDialog {...props} />
      </StateContext.Provider>
    </ApolloProvider>
  );

  it('executes the query with the correct variables', () => {
    wrapper.find('ForwardRef(IconButton)').at(0).simulate('click')
    expect(returnHandler).toBeCalledTimes(1);
  });
});
