import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MockComponent from '../../../../../__mocks__/mockComponent';
import {GET_SALE_HISTORY} from '../../../../queries/salesHistoryQuery';
import { SaleHistoryDetailContainer } from '../../../../containers/saleHistoryDetailsContainer';
import { StateContext } from '../../../../providers/stateProvider';

jest.mock('../../../../components/sell/salesHistory/salesHistoryDetail', () => MockComponent);
const context = ['kitty', jest.fn()];

SaleHistoryDetailContainer.contextTypes = [
  PropTypes.string,
  PropTypes.func
];

const props = {
    match: { params: { id: 736 } }
}
describe('testing the Query component', () => {
    const generate = async (mocks, success) => {
      const mockClient = createMockClient();
      if (success) {
        mockClient.setRequestHandler(
            GET_SALE_HISTORY,
          () => Promise.resolve(mocks)
        );
      } else {
        mockClient.setRequestHandler(
            GET_SALE_HISTORY,
          () => Promise.reject(mocks)
        );
      }
  
      const wrapper = mount(
        <ApolloProvider client={mockClient}>
          <StateContext.Provider value={context}>
            <BrowserRouter>
              <SaleHistoryDetailContainer {...props} />
            </BrowserRouter>
          </StateContext.Provider>
        </ApolloProvider>
      );
      return wrapper;
    };

    it('should fetch the the sale successfully', async () => {
      const mocks = {
        "data": {
            "saleHistory": {
              "id": "657",
              "createdAt": "2020-02-19T03:17:32.682987+00:00",
              "salesPerson": {
                "firstName": "Placide",
                "lastName": "IRANDORA",
                "role": {
                  "name": "Master Admin"
                }
              },
              "receipt": {
                "cashier": { "firstName": 'robben bahati' }, "subTotal": 1231, "discountTotal": 231, "amountToPay": 1200, "changeDue": 1000, "purchaseTotal": 1231
              },
              "customer": 'custmer name',
              "outlet": {
                "name": "ta",
                "city": {
                  "name": "Kituni"
                }
              },
              "saledetailSet": [
                {
                  "id": "603",
                  "product": {
                    "id": "3797",
                    "productName": "CAMOSUNATE QUICK BOOK",
                    "quantityInStock": 0,
                    "dispensingSize": {
                      "name": "NULL"
                    }
                  },
                  "quantity": 1,
                  "discount": 0.0,
                  "price": 600.0
                }
              ],
              "registerId": null,
              "paidAmount": 1200.0,
              "paymentMethod": "CASH"
            }
          }
      };
      const wrapper = await generate(mocks, true);
      await wait(0);
      const SaleHistoryDetail = wrapper.find('SaleHistoryDetailContainer');
      expect(SaleHistoryDetail.props().match.params.id).toEqual(props.match.params.id);
    });
  
    it('should handle error while fetching', async () => {
      const mocks = { error: new Error('gpl Error') };
      const wrapper = await generate(mocks, false);
      await wait(0);
      const ErrorComponent = wrapper.update().find('[name="error"]');
      expect(ErrorComponent.length).toBe(1);
    });
  });