import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import PropTypes from 'prop-types';
import { GET_APPROVED_PRODUCTS, SEARCH_PRODUCTS } from '../../../queries/productsQueries/productQueries';
import { PricingLoyalty as PricingLoyaltyWrapper } from '../../../components/pricing_loyalty/pricingLoyalty';

import { StateContext } from '../../../providers/stateProvider';

const resolvedData = {
  data: {
    approvedProducts: [{
      "id": "493",
      "isApproved": true,
      "productName": "Cannula Pink/blue/green/yellow",
      "image": "",
      "skuNumber": "000493",
      "description": "Cannula is a thin tube inserted into a vein or body cavity to administer medication, drain off fluid, or insert a surgical instrument.",
      "brand": "Not Available",
      "manufacturer": "Harsoria",
      "vatStatus": false,
      "salesPrice": 140.0,
      "markup": 25,
      "autoPrice": true,
      "nearestExpiryDate": "2020-12-03",
      "loyaltyWeight": 2,
      "tags": [],
      "reorderPoint": 6,
      "reorderMax": 12,
      "batchInfo": [{
        "id": "20qsgtoh9",
        "unitCost": 40.0,
        "dateReceived": "2019-12-14",
        "expiryDate": "2020-12-29",
        "batchQuantities": [{
          "id": "1",
          "quantityRemaining": 7
        }]
      }],
      "productCategory": {
        "id": "106",
        "name": "OTC"
      },
      "quantityInStock": 542,
      "dispensingSize": {
        "id": "11",
        "name": "Pieces"
      },
      "preferredSupplier": {
        "id": "b6o9tttmb",
        "name": "Dunn LTD",
        "suppliersmetaSet": {
          "id": "1",
          "displayName": "new"
        }
      },
      "backupSupplier": {
        "id": "c77p66muq",
        "name": "Castaneda LTD",
        "suppliersmetaSet": {
          "id": "1",
          "displayName": "new"
        }
      }
    }],
    "totalProductsPagesCount": 6,
    "productsTotalNumber": 30
  }
}
const props = {
  session: { me: { role: { name: "Master Admin" }, } },
  history: { push: jest.fn() },
};

const context = ['kitty', jest.fn()];

describe('PricingLoyalty ', () => {
  const mockClient = createMockClient();
  const variables = {
    pageCount: 50,
    pageNumber: 1
  }
  const returnHandler = jest.fn().mockResolvedValue({ ...resolvedData });
  mockClient.setRequestHandler(GET_APPROVED_PRODUCTS, returnHandler);

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <Router>
        <StateContext.Provider value={context}>
          <PricingLoyaltyWrapper {...props} />
        </StateContext.Provider>
      </Router>
    </ApolloProvider>
  );

  it('renders without error', () => {
    expect(returnHandler).toBeCalledWith(variables);
    expect(wrapper.find('DataTableLoader').length).toEqual(1);
  });
});

describe('PricingLoyalty Errors', () => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(
    GET_APPROVED_PRODUCTS,
    () => Promise.resolve({ errors: [{ message: 'GraphQL Error' }] })
  );

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <Router>
        <StateContext.Provider value={context}>
          <PricingLoyaltyWrapper {...props} />
        </StateContext.Provider>
      </Router>
    </ApolloProvider>
  );

  it('renders errors', () => {
    expect(wrapper.find('DataTableLoader').length).toEqual(1);
  });
});

describe('PricingLoyalty instance', () => {
  const mockClient = createMockClient();
  const returnHandler = jest.fn().mockResolvedValue({ ...resolvedData });
  mockClient.setRequestHandler(SEARCH_PRODUCTS, returnHandler);

  PricingLoyaltyWrapper.contextTypes = [
    PropTypes.object,
    PropTypes.func
  ];
  const wrapper = shallow(<PricingLoyaltyWrapper {...props} />, { context });

  it('handles ChangeRowsPerPage', () => {
    const event = { target: { value: 6 } }
    wrapper.instance().setState({currentPageCount: 5})
    wrapper.instance().handleChangeRowsPerPage(event)
    expect(wrapper.state('currentPageCount')).toBe(6)
  });
  it('handles ChangePage', () => {
    const newPage = 3;
    wrapper.instance().setState({currentPage: 2})
    wrapper.instance().handleChangePage('_', newPage)
    expect(wrapper.state('currentPage')).toBe(4)
  });

  it('handles Search with less than 3 chars', (done) => {
    const event = { target: { value: '' } }
    wrapper.instance().handleSearch( event , mockClient)   
    expect(wrapper.state('isSearching')).toBeFalsy;

    done();
  });
  it('handles Search with more than 3 chars', (done) => {
    const event = { target: { value: 'Sea' } }
    wrapper.instance().handleSearch( event , mockClient)   
    expect(wrapper.state('isSearching')).toBeFalsy;

    done();
  });
});
