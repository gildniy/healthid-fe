import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider }from 'react-apollo/test-utils';
import MockComponent from '../../../../../__mocks__/mockComponent';
import ORDER_DETAIL_QUERY from '../../../../queries/getClosedOrdreQuery';
import { OrderDetail } from '../../../../containers/orders/OrderDetail';

jest.mock('../../../../components/ordersAndSuppliers/orderDetailRender', () => MockComponent);

const props = {
    match: {
        params: {
            id: 8,
            supplierOrderNumber: '7w76n2c2j-85z7puo6p'
        }
    },
    session: {
        me: {
            activeOutlet: {
                outletpreference: {
                    outletTimezone: {
                        name: "Africa/Nairobi"
                    }
                }
            }
        }
    }
};
const mocks = [{
    request: {
        query: ORDER_DETAIL_QUERY,
        variables: { orderID: 8 }
    },
    result: {
        data: {
            order: {
                id: "8",
                orderNumber: "5h0cujrgl",
                sentStatus: false,
                createdAt: "2020-01-10T08:43:57.394222+00:00",
                status: "Incomplete order form",
                user: null,
                name: "January new year order",
                closed: false,
                orderdetailsSet: [
                    {
                        supplierOrderNumber: "5h0cujrgl-6qfiq0ycq",
                        product: {
                            id: "506",
                            productName: "Celebrex 200mgtablets X10",
                            unitCost: 0
                        },
                        orderedQuantity: 10,
                        price: ""
                    }
                ],
                deliveryDate: "2020-01-25",
                invoice: null,
                supplierorderdetailsSet: [
                    {
                        supplierOrderName: "topmark-January new year order",
                        supplierOrderNumber: "5h0cujrgl-6qfiq0ycq",
                        additionalNotes: null,
                        supplier: {
                            id: "6qfiq0ycq",
                            name: "topmark",
                            suppliersmetaSet: [
                                {
                                    creditDays: 1,
                                    paymentTerms: "ON_CREDIT"
                                }
                            ]
                        },
                        deliveryDue: "2020-01-25",
                        deliverTo: "Debra Slater",
                        createdAt: "2020-01-20T13:58:35.522333+00:00"
                    }
                ]
            }
        }
    }
}];
describe('renders OrderDetail component', () => {
    it('should show error UI', async () => {
        const newProps = {
            match: {
                params: {
                    id: NaN
                }
            }
        };

        const newMocks = [{
            request: {
                query: ORDER_DETAIL_QUERY,
                variables: { orderID: NaN }
            },
            error: new Error('Something went wrong'),

        }];

        const wrapper = mount(
            <MockedProvider mocks={newMocks} addTypeName={false}>
                <BrowserRouter>
                    <OrderDetail {...newProps} />
                </BrowserRouter>
            </MockedProvider>
        );
        await wait(0);
        expect(wrapper.update().find('div').text()).toContain('Error');
    });
  it('should render without error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypeName={'false'}>
        <BrowserRouter>
          <OrderDetail {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
    await wait(30);
    expect(wrapper.find('ProductLoader').length).toBe(1);
  });
});
