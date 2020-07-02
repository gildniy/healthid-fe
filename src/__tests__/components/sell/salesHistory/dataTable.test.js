import React from 'react';
import { shallow, mount } from 'enzyme';
import * as AppContext from '../../../../providers/stateProvider';
import DataTable from '../../../../components/sell/salesHistory/dataTable';

const props = {
  state: {
    initialData: null,
    salesData: [{
      id: 1,
      dateSold: new Date(),
      timeSold: '00:00',
      location: '',
      soldBy: '',
      receiptId: 11,
      soldTo: '',
    }],
    openSearchPopper: false,
    searchPopperAnchorEl: null,
  },
  title: '',
  columns: [],
  handleSalesSearch: jest.fn(),
  handleDateTimeFilter: jest.fn(),
  handleSearchFilter: jest.fn(),
  handleResetSales: jest.fn(),
  handleOnRowClick: jest.fn(),
  event: { target: { value: '' } },
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
    }]
  }
}

const context = [state, jest.fn()];

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => context);

describe('dataTable component', () => {
  const  wrapper = shallow((
    <DataTable {...props} />
  ));
  it('renders the dataTable component', () => {
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
  it('handles ChangePage', () => {
    const event = ''
    const newPage = 10
    const tablePagination = wrapper.find('WithStyles(ForwardRef(TablePagination))')
    tablePagination.props().onChangePage(event, newPage);
    expect(context[1]).toHaveBeenCalled;
  });
  it('handles ChangeRowsPerPage', () => {
    const event = { target: { value: 50 }}
    const tablePagination = wrapper.find('WithStyles(ForwardRef(TablePagination))')
    tablePagination.props().onChangeRowsPerPage(event);
    expect(context[1]).toHaveBeenCalled;
  });
});
