import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomToolBar } from '../../../components/stock_control/Table/CustomToolBar';
import {
  StockCount,
  LowQuantityNotification,
  Export,
  ApproveStockIcon
} from '../../../assets/images/stock/StockIcons';

describe('CustomToolBar ', () => {
  const props = {
    classes: { svg: {} },
    isAdmin: true,
    handleClickSearch: jest.fn(),
    isSearchActive: false,
    handleHideSearch:jest.fn(),
    handleTextChange: jest.fn()
  };
  const event = {
    target: {}
  };
  const wrapper = shallow(<CustomToolBar {...props} />);

  it('renders without crashing', () => {
    wrapper.instance().handleToggleApprove();
    wrapper.instance().handleToggleStock();
    wrapper.instance().anchorEl = {contains: jest.fn()};
    wrapper.instance().StockElement = {contains: jest.fn()};
    wrapper.instance().handleCloseStock(event);
    expect(wrapper.find('[title="Stock count"]').length).toBe(0);
  });

  it('handles "handleToggleBatch"', () => {
    wrapper.instance().handleToggleBatch();
    expect(wrapper.state('batchOpen')).toBeFalsy
  })

  it('handles "handleCloseBatch"', () => {
    wrapper.instance().addBatchEl = {contains: jest.fn()};
    wrapper.instance().handleCloseBatch(event);
    expect(wrapper.state('batchOpen')).toBeFalsy
  })

  it('handles "handleCloseApprove"', () => {
    wrapper.instance().anchorEl = {contains: jest.fn()};
    wrapper.instance().handleCloseApprove(event);
    expect(wrapper.state('open')).toBeFalsy
  })

  it('renders "CustomIconButton" and ', () => {
    wrapper.instance().addBatchEl = {contains: jest.fn()};
    wrapper.instance().handleCloseBatch(event);
    expect(wrapper.state('batchOpen')).toBeFalsy
  })
});

describe('Stock  control icons ', () => {
  it('stock count renders without crashing', () => {
    const wrapper = shallow(<StockCount />);
    expect(wrapper.find('[id="Stock_Count_Icon"]').length).toBe(1);
  });

  it('LowQuantityNotification renders without crashing', () => {
    const wrapper = shallow(<LowQuantityNotification />);
    expect(wrapper.find('[id="Low_quantity_Notification_Icon"]').length).toBe(1);
  });

  it('Export renders without crashing', () => {
    const wrapper = shallow(<Export />);
    expect(wrapper.find('[id="Export"]').length).toBe(1);
  });

  it('ApproveStockIcon renders without crashing', () => {
    const wrapper = shallow(<ApproveStockIcon />);
    expect(wrapper.find('[id="Approve"]').length).toBe(1);
  });
});
