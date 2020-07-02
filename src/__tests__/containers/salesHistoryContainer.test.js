import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { BrowserRouter } from 'react-router-dom';
import MockComponent from '../../../__mocks__/mockComponent';
import GET_SALES_HISTORY from '../../queries/salesHistoryQuery';
import { SaleHistoryContainer } from '../../containers/salesHistoryContainer';
import { StateContext } from '../../providers/stateProvider';

jest.mock('../../containers/salesHistory', () => MockComponent);

const context = [{
  saleHistory: {
    currentPage: 1, currentPageCount: 2,
    startDate: '', endDate: '', search: ''
  }
}, jest.fn()];

const props = {
  session: {
    me: {
      outlets: [{ id: 1 }],
      activeOutlet: {
        outletpreference: {
          outletCurrency: {symbol: '₦'}
        }
      }
    }
  },
};

describe('SellScreenContainer with InitialData', () => {
  const generate = async (mocks, success) => {
    const mockClient = createMockClient();
    if (success) {
      mockClient.setRequestHandler(
        GET_SALES_HISTORY,
        () => Promise.resolve(mocks)
      );
    } else {
      mockClient.setRequestHandler(
        GET_SALES_HISTORY,
        () => Promise.reject(mocks)
      );
    }

    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <StateContext.Provider value={context}>
          <BrowserRouter>
            <SaleHistoryContainer {...props} />
          </BrowserRouter>
        </StateContext.Provider>
      </ApolloProvider>
    );
    return wrapper;
  };

  const mocks = {
      data: {
        outletSalesHistory: [{
          id: '3',
          createdAt: '2019-06-28T04:58:43.043794+00:00',
          paymentMethod: 'cash',
          saledetailSet: [],
          salesPerson: {
            id: 1,
            firstName: 'myco',
            lastName: 'kibuuka',
            __typename: ''
          },
          receipt: {
            id: 1,
            receiptNo: 1,
            __typename: ''
          },
          amountToPay: 38.1,
          customer: {
            id: 1,
            firstName: '',
            lastName: '',
            __typename: ''
          },
          outlet: {
            id: 1,
            name: 'Transcend Pharmacy',
            city: {
              id: 1,
              name: 'Kampala',
              __typename: ''
            },
            __typename: ''
          },
          __typename: ''
        }],
        totalNumberOfSales: 1
      },
  };
  it('renders without crashing', async () => {
    const wrapper = await generate(mocks, true);
    await wait(0);
    const mockedComponent = wrapper.update().find('MockComponent');
    expect(mockedComponent.length).toBe(1);
  });
  
  it('handles error', async () => {
    const wrapper = await generate(mocks, false);
    await wait(0);
    const ErrorComponent = wrapper.update().find('[id="error"]');
    expect(ErrorComponent.length).toBe(1);
  });
});
