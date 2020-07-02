
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import _ from '../../../../__mocks__/mockUseContext';
import { MainSetup } from '../../../components/main_setup/mainSetup';
import MenuItem from '../../../components/main_setup/menuItem';

describe('Tests that the main settings page is rendered', () => {
  const dummySession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      id: '1234567',
      lastName: 'tester',
      mobileNumber: '+254717123456',
      role: {
        name: 'Master Admin',
        __typename: 'RoleType'
      },
      secondaryEmail: 'njihiadee@outlook.com',
      secondaryPhoneNumber: '+254717123456',
      username: 'darius',
      users: [{}, {}],
      businessUser: { id: 'j1h31uh31h' }
    }
  };

  it('Should render the component', () => {
    const wrapper = shallow(<MainSetup session={dummySession} classes={{}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render with menu items', () => {
    const wrapper = mount(
      <MemoryRouter>
        <MainSetup session={dummySession} classes={{}} />
      </MemoryRouter>
    );
    expect(wrapper.find(MenuItem)).toHaveLength(4);
  });

  it('Should render with menu items - cashier', () => {
    dummySession.me.role.name = 'Cashier';
    dummySession.me.outlets = [{ business: { id: 'j1h31uh31h' } }];
    const wrapper = mount(
      <MemoryRouter>
        <MainSetup session={dummySession} classes={{}} />
      </MemoryRouter>
    );
    expect(wrapper.find(MenuItem)).toHaveLength(4);
  });

  it('should toggle menu items', () => {
    const wrapper = shallow(<MainSetup session={dummySession} classes={{ }} />);
    wrapper.find(MenuItem).at(0).props().toggleActive('account');
    expect(wrapper.find(MenuItem).at(0).props().active).toEqual('account');
    wrapper.find(MenuItem).at(0).props().toggleActive();
    expect(wrapper.find(MenuItem).at(0).props().active).toEqual(null);
  });
});
