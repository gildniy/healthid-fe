import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { BrowserRouter } from 'react-router-dom';
import { StateContext } from '../../../../providers/stateProvider';
import * as AppContext from '../../../../providers/stateProvider';
import OrderTable from '../../../../components/ordersAndSuppliers/Templates/orderTable';
import { orderMockContext } from '../../../../../__mocks__/OrderPropsMock';

const contextValues = [ orderMockContext, jest.fn() ];
const context = {
  state: orderMockContext
}

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);
describe('renders OrderTable component', () => {
  let useEffect;
  const props = {
    status: "OPEN",
    openBatchModal: jest.fn(),
    openNotReceivedModal: jest.fn(),
    orderDetails: [
      {
        id: '8fe62hmy0',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '491',
          productName: 'Canesten Cream 20g'
        }
      },
      {
        id: '277goz6i5',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '498',
          productName: 'Carzepin 200mg Tablets X50'
        }
      }
    ],
    grandTotal: 9200.0,
    filter: jest.fn()
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });
  let wrapper;
  it('should render without error', async () => {
    wrapper = mount(
      <BrowserRouter>
        <StateContext.Provider value={context}>
          <OrderTable {...props} />
        </StateContext.Provider>
      </BrowserRouter>
    );
    await wait(0);
    expect(wrapper.find('ForwardRef(Table)').length).toBe(1);
  });

  it('Should trigger on Click ', async () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).props().onClick();

    expect(props.openBatchModal).toHaveBeenCalled();
  });

  it('should does not render a table cell when order is open', async () => {
    wrapper = mount(
      <BrowserRouter>
        <StateContext.Provider value={context}>
          <OrderTable {...props} />
        </StateContext.Provider>
      </BrowserRouter>
    );
    await wait(0);
    expect(wrapper.find('ForwardRef(Table)').length).toBe(1);
  });
});
