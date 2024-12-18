import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomToolBar } from '../../components/products/Templates/Table/CustomToolBar';
import IconFactory from '../../assets/images/iconFactory/IconFactory';
import {
  Export,
} from '../../assets/images/stock/StockIcons';
import check from '../../assets/images/suppliers/check.png';
import { StateContext } from '../../providers/stateProvider';

const context = [true, jest.fn()]

describe('Product Page CustomToolBar ', () => {
  it('renders without crashing', () => {
    const props = {
      classes: { svg: {} },
      state: { searchText: '' },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn(),
      handleToggleAddProduct: jest.fn(),
      handleViewProposed: jest.fn(),
      handleChangeView: jest.fn(),
      handlePrintButton: jest.fn(),
      isColumnHidden: jest.fn(),
      currentPath: []
    };

    const event = {
      target: {}
    };

    const tableSwitch = 'WithStyles(ForwardRef(FormControlLabel))';

    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.instance().handleToggleAddProduct();
    wrapper.instance().anchorEl = {
      contains: jest.fn()
    };
    wrapper.instance().addProductElement = {
      contains: jest.fn()
    };
    wrapper.find(tableSwitch).at(0).props().control.props.onChange();
    wrapper.find(tableSwitch).at(1).props().control.props.onChange();
    wrapper.find(tableSwitch).at(2).props().control.props.onChange();
    wrapper.instance().handleToggle();
    wrapper.instance().handleCloseAddProduct(event);
    expect(wrapper.find('[title="Export List"]').length).toBe(1);
  });

  it('responds to on click events', () => {
    const props = {
      classes: { svg: {} },
      state: { searchText: '' },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn(),
      handleViewProposed: jest.fn(),
      handlePrintButton: jest.fn(),
      handleToggleAddProduct: jest.fn(),
      isColumnHidden: jest.fn(),
      currentPath: []

    };

    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.find('[aria-haspopup="true"]').at(0).simulate('click');
    wrapper.find('[aria-haspopup="true"]').at(1).simulate('click');
    expect(wrapper.find('[aria-haspopup="true"]').length).toBe(2);
  });

  it('update props ', async () => {
    const props = {
      classes: { svg: {} },
      state: { searchText: '' },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn(),
      status: 'approved',
      currentPath: [],
      hiddenColumns: [],
      handleViewProposed: jest.fn(),
      handleChangeView: jest.fn(),
      handleToggleAddProduct: jest.fn(),
    };
    const wrapper = shallow(
      <CustomToolBar {...props} />
    );
    wrapper.instance().handleToggleViewMenu();
    wrapper.instance().handleClose();
    wrapper.instance().handleToggleViewColumnMenu();
    wrapper.instance().handleClosing();
    wrapper.instance().handleViewExportMenu();
    wrapper.instance().handleChangeView('status');
    wrapper.setState({
      savePrintOpen: jest.fn(),
    });
    wrapper.instance().isColumnHidden();
    wrapper.setProps({
      ...props,
      isSearchActive: true,
    });
  });
});

describe('Products page icons ', () => {
  it('Export renders without crashing', () => {
    const wrapper = shallow(<Export />);
    expect(wrapper.find('[id="Export"]').length).toBe(1);
  });

  it('IconFactory renders without crashing', () => {
    const wrapper = shallow(<IconFactory iconStyle="" type={check} iconClass="" iconAlt="" />);
    expect(wrapper.length).toBe(1);
  });
});
