import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { DataTable } from '../../../../components/ordersAndSuppliers/orders/OrdersData';

const props = {
  classes: {},
  title: 'title',
  onRowClick: jest.fn(),
  handleClickSearch: jest.fn(),
  rows: [{id: 1, }]
};
const wrapper = mount((
  <MockedProvider addTypename>
    <DataTable {...props} />
  </MockedProvider>
));

describe('orders and suppliers component', () => {
  const Orders = wrapper.find('DataTable');

  it('renders DataTable component correctly', () => {
    expect(Orders.length).toBe(1);
    const instance = Orders.instance();
    instance.setState({ isSearching: true });
    expect(instance.state.isSearching).toBeTruthy();
  });
  it('brings search bar when search icon clicked', () => {
    const instance = Orders.instance();
    instance.handleClickSearch();
    expect(instance.state.isSearchActive).toBeTruthy();
  });
  it('hides the search bar', () => {
    const instance = Orders.instance();
    instance.handleHideSearch();
    expect(instance.state.isSearchActive).toBeFalsy();
  });
  it('select all table rows', () => {
    const instance = Orders.instance();
    const rows = [{
      id: 'hyg12',
      orderDetails: [{
        orderedQuantity: 1,
        supplier: {
          id: 1,
          suppliersmetaSet: [
            {
              displayName: 'Eric Ltd'
            }
          ]
        },
        product: { id: 1, batchInfo: [] },
      }]
    }];
    const event = {
      target: {
        checked: true,
      }
    };
    instance.setState({ rows, selected: [] });
    instance.handleSelectAllClick(event);
    expect(instance.state.selected).toEqual(['hyg12']);
  });
  it('selects a row when clickd on', () => {
    const instance = Orders.instance();
    instance.handleRowSeleted(null, 'hyg12');
    expect(instance.state.selected).toEqual([]);
    instance.handleRowSeleted(null, 'me12');
    expect(instance.state.selected).toEqual(['me12']);
    instance.handleRowSeleted(2, 'you12');
    expect(instance.state.selected).toEqual(['me12', 'you12']);
    instance.handleRowSeleted(null, 'you12');
    expect(instance.state.selected).toEqual(['me12']);
  });
  it('sorts in ascending or descending order', () => {
    const instance = Orders.instance();
    instance.handleRequestSort(null, 'date');
    expect(instance.state.orderBy).toEqual('date');
    const e = {
      target: {
        checked: false,
      }
    };
    instance.handleSelectAllClick(e);
    expect(instance.state.selected).toEqual([]);
  });
});
