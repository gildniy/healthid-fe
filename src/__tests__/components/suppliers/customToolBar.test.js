import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomToolBar } from '../../../components/suppliers/Templates/Table/CustomToolBar';
import { BrowserRouter as Router } from 'react-router-dom';
import IconFactory from '../../../assets/images/iconFactory/IconFactory';
import {
  Export,
} from '../../../assets/images/stock/StockIcons';
import check from '../../../assets/images/suppliers/check.png';

const props = {
  classes: { svg: {} },
  isAdmin: true,
  handleTextChange: jest.fn(),
  handleViewProposed: jest.fn(),
};

describe('Supplier Page CustomToolBar ', () => {
  it('renders without crashing', () => {
    const event = {
      target: {}
    };
    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.instance().handleToggleAddSupplier();
    wrapper.instance().anchorEl = {
      contains: jest.fn()
    };
    wrapper.instance().addSupplierElement = {
      contains: jest.fn()
    };
    wrapper.instance().handleToggle();
    wrapper.instance().handleCloseAddSupplier(event);
    expect(wrapper.find('[title="Export List"]').length).toBe(1);
  });

  it('responds to on click events', () => {
    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.setState({addSupplierOpen: true, openViewMenu: true})
    wrapper.find('[toolTip="Add Supplier"]').at(0).props().onClickHandler();
    expect(wrapper.state('addSupplierOpen')).toBe(false);
  });
  it('responds to on click events', () => {
    const wrapper = mount(<CustomToolBar {...props} />);
    wrapper.setState({
      openViewMenu: true,
      approved: true,
    })
    wrapper.find('WithStyles(ForwardRef(Switch))').at(0).props().onChange();
    expect(wrapper.state('approved')).toBe(false);
  });

  it('update props ', async () => {
    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.instance().handleToggleViewMenu();
    wrapper.instance().handleClose();
 });
});

describe('Supplier page icons ', () => {
  it('Export renders without crashing', () => {
    const wrapper = shallow(<Export />);
    expect(wrapper.find('[id="Export"]').length).toBe(1);
  });

  it('IconFactory renders without crashing', () => {
    const wrapper = shallow(<IconFactory iconStyle='' type={check} iconClass='' iconAlt='' />);
    expect(wrapper.length).toBe(1);
  });
});
