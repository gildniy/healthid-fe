/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import {
  ListItem, ListItemAvatar, Typography, ListItemSecondaryAction
} from '@material-ui/core';
import _ from '../../../__mocks__/mockUseContext';
import MenuItem from '../../components/main_setup/menuItem';

function toggleActive() {

}
describe('Tests that the main settings page is rendered', () => {
  const props = {
    id: 'business',
    title: 'Business Information',
    description: 'View information about your business',
    icon: '/c8a45b21b9e509561bea214bbfcfc379.png',
    link: 'main_setup/business_information/8wach64jv',
    active: 'business',
    toggleActive: jest.fn()
  };

  it('Should render the component', () => {
    const wrapper = shallow(<MenuItem {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render unactive menu item', () => {
    props.active = null;
    const wrapper = shallow(<MenuItem {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render last menu item', () => {
    props.last = true;
    const wrapper = shallow(<MenuItem {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should toggle menu items', () => {
    props.toggleActive = () => {
      props.active = undefined;
    };
    const wrapper = shallow(<MenuItem {...props} />);
    wrapper.find(ListItem).props().onMouseEnter();
    expect(wrapper.props().active).toEqual(undefined);
  });
  it('should toggle menu items', () => {
    props.toggleActive = () => {
      props.active = undefined;
    };
    const wrapper = shallow(<MenuItem {...props} />);
    wrapper.find(ListItemAvatar).props().onMouseEnter();
    expect(wrapper.props().active).toEqual(undefined);
  });
  it('should toggle menu items', () => {
    props.toggleActive = () => {
      props.active = undefined;
    };
    const wrapper = shallow(<MenuItem {...props} />);
    wrapper.find(Typography).forEach((element) => {
      element.props().onMouseEnter();
    });

    expect(wrapper.props().active).toEqual(undefined);
  });
  it('should toggle menu items', () => {
    props.toggleActive = () => {
      props.active = undefined;
    };
    props.active = 'business';
    const wrapper = shallow(<MenuItem {...props} />);
    wrapper.find(ListItemSecondaryAction).props().onMouseEnter();
    expect(wrapper.props().active).toEqual(undefined);
  });
});
