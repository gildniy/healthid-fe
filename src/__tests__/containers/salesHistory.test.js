import React from 'react';
import { shallow, mount } from 'enzyme';
import * as AppContext from '../../providers/stateProvider';
import { SalesHistory } from '../../containers/salesHistory';

const push = jest.fn()
const props = {
  currency: '',
  history: { push },
  outletSalesData: {
    outletSalesHistory: [{
    id: '3',
    createdAt: '2019-06-28T04:58:43.043794+00:00',
    salesPerson: {
      firstName: 'myco',
      lastName: 'kibuuka',
    },
    receipt: {
      receiptNo: 1,
    },
    amountToPay: 38.1,
    customer: {
      firstName: '',
      lastName: '',
    },
    outlet: {
      name: 'Transcend Pharmacy',
      city: {
        name: 'Kampala',
      },
    },
    }],
    totalNumberOfSales: 2
  }
};

const state = { 
  saleHistory: {
    salesData: [{
      dateSold: new Date(),
      location: 'Transcend | Register 1',
      saledetailSet: [{
        id: 101,
        product: {
          id: 9,
          productName: 'new',
        },
        quantity: 5,
        price: 200
      }]
    }],
    initialData: [{
      dateSold: new Date(),
      timeSold: '12:00'
    }],
    totalNumberOfSales: 10
  }
}

const context = [state, jest.fn()];

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => context);

const historyMock = { push: jest.fn() };

describe('SalesHistory', () => {
  const date = new Date();
  let wrapper;
  let useEffect;
  let SalesHistoryDetails;

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
    wrapper = shallow(
      <SalesHistory {...props} history={historyMock} />
    );
    SalesHistoryDetails = wrapper.find('WithStyles(SalesHistoryDetails)');
  });

  it('renders without crashing', () => {
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
  it('handle handleOnRowClick', () => {
    const id = { id: 134 };
    SalesHistoryDetails.props().handleOnRowClick(id);
    expect(context[1]).toHaveBeenCalled
  });
  it('handle ResetSales', () => {
    SalesHistoryDetails.props().handleResetSales();
    expect(context[1]).toHaveBeenCalled
  });
  it('creates Columns', () => {
    const headers = ['soldTo, soldBy'];
    SalesHistoryDetails.props().createColumns(headers);
    expect(context[1]).toHaveBeenCalled
  });
});
