import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMockClient } from 'mock-apollo-client';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import ModalForm from '../../../components/modal/modalForm';
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

describe('Tests for Modal Form', () => {
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
            <ModalForm {...props} />
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
            <ModalForm {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    ));

    const ModalFormComponent = wrapper.find('ModalForm');

    it('renders OrderCustomToolBar component correctly', () => {
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles handleDateChange', () => {
      const name = 'expiryDate';
      const event = new Date('2020-02-28');
      ModalFormComponent.instance().handleDateChange(name, event);
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles handleInputChage', () => {
      const event = { target: { name: 'expiryDate', value: '2020-01-20' } };
      ModalFormComponent.instance().handleInputChange(event);
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles handleServiceButton', () => {
      ModalFormComponent.instance().handleServiceButtons(3);
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles handleSave', () => {
      ModalFormComponent.instance().handleSaveChanges();
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles popperClickAway', () => {
      ModalFormComponent.instance().popperClickAway();
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles displaySelected', () => {
      ModalFormComponent.instance().displaySelected('supplier', 'Supplier 1', '1');
      expect(ModalFormComponent.length).toBe(1);
      ModalFormComponent.instance().displaySelected('product', 'Product 1', '1');
      expect(ModalFormComponent.length).toBe(1);
    });

    it('toggles handleSearchChange', () => {
      const event = { target: { name: 'supplier', value: 'CON' } };
      const data = {
        filterSuppliers: {
          edges: [
            {
              node: {}
            }
          ]
        }
      };
      const client = {
        query: jest.fn(() => Promise.resolve(data))
      };

      ModalFormComponent.instance().handleSearchChange(event, client);
      expect(ModalFormComponent.length).toBe(1);
    });
  });
});
