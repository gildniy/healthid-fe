import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMockClient } from 'mock-apollo-client';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import ConfirmModal from '../../../components/modal/confirmModal';
import { StateContext } from '../../../providers/stateProvider';
import * as AppContext from '../../../providers/stateProvider';
import { orderMockContext } from '../../../../__mocks__/OrderPropsMock';


const context = {
  state: orderMockContext,
  dispatch: jest.fn()
};

const contextValues = [context, jest.fn()];

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

describe('Tests for confirm Modal', () => {
  const mockClient = createMockClient();
  let wrapper;
  it('Renders the modal form correctly', async () => {
    const props = {
      handleClose: jest.fn()
    };
    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <ConfirmModal {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </ApolloProvider>, { context }
    );
    expect(wrapper).toHaveLength(1);
  });


  describe('Render Display Data', () => {
    const props = {
      handleClose: jest.fn()
    };

    const wrapper = mount((
      <ApolloProvider client={mockClient}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <ConfirmModal {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    ));

    const ConfirmModalComponent = wrapper.find('ForwardRef(Modal)');

    it('renders OrderCustomToolBar component correctly', () => {
      expect(ConfirmModalComponent.length).toBe(1);
    });
  });
});
