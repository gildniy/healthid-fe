import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { GET_APPROVED_PRODUCTS } from '../../../queries/productsQueries/productQueries';
import StockControl, { StockControl as StockControlWrapper } from '../../../components/stock_control/stockControl';

import { StateContext } from '../../../providers/stateProvider';

describe('StockControl ', () => {
  const mocks = [
    {
      request: {
        query: GET_APPROVED_PRODUCTS,
        variables: { pageCount: 5, pageNumber: 1 }
      },
      result: {
        data: {
          approvedProducts: [
            {
              id: '493',
              productName: 'Cannula Pink/blue/green/yellow',
              image: '',
              skuNumber: '000493',
              description: 'Cannula is a thin tube inserted into a vein or body cavity to administer medication, drain off fluid, or insert a surgical instrument.',
              brand: 'Not Available',
              manufacturer: 'Harsoria',
              vatStatus: false,
              salesPrice: 140.0,
              markup: 25,
              autoPrice: true,
              nearestExpiryDate: '2020-12-03',
              loyaltyWeight: 2,
              tags: [],
              reorderPoint: 6,
              reorderMax: 12,
              batchInfo: [
                {
                  id: '20qsgtoh9',
                  unitCost: 40.0,
                  dateReceived: '2019-12-14'
                },
                {
                  id: 'n497kgc6i',
                  unitCost: 110.0,
                  dateReceived: '2019-01-03'
                }
              ],
              productCategory: {
                id: '106',
                name: 'OTC'
              },
              quantityInStock: 542,
              dispensingSize: {
                id: '11',
                name: 'Pieces'
              },
              preferredSupplier: {
                id: 'b6o9tttmb',
                name: 'Dunn LTD'
              },
              backupSupplier: {
                id: 'c77p66muq',
                name: 'Castaneda LTD'
              }
            }
          ]
        }
      }
    }
  ];

  const props = {
    session: {
      me: {
        username: 'tester',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: {
              name: 'Africa/Nairobi'
            }
          }
        }
      }
    },
    history: { push: jest.fn() },
  };

  const context = ['kitty', jest.fn()];

  it('renders without error with a protected route', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <StockControl {...props} />
        </Router>
      </MockedProvider>
    );

    expect(wrapper.find('Router').length).toEqual(1);
  });

  describe('unconnected component', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <StateContext.Provider value={context}>
            <StockControlWrapper {...props} />
          </StateContext.Provider>
        </Router>
      </MockedProvider>
    );

    it('renders without error', async () => {
      await wait(0);
      expect(wrapper.find('DataTableLoader').length).toEqual(1);
      wrapper.update();
    });
  });
});
