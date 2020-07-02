import React from 'react';
import { shallow } from 'enzyme';
import { TableToolBar } from '../../../../components/suppliers/Revisions/TableToolBar';
import '../../../../../__mocks__/window';

describe('Render Add Supplier component', () => {
  const searchProps = {
    handleTextChange: jest.fn(),
    handleHideSearch: jest.fn(),
    handleClickSearch: jest.fn(),
  };

  it('should displaying loading table toolbar', () => {
    const propsLoading = {
      number: 0,
      loading: true,
      isSearchActive: false,
      ...searchProps
    };
    const wrapper = shallow(<TableToolBar {...propsLoading} />);
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').props().children).toEqual('');
  });

  it('should displaying loaded table toolbar', () => {
    const propsDataLoaded = {
      number: 10,
      loading: false,
      isSearchActive: true,
      ...searchProps
    };
    const wrapper = shallow(<TableToolBar {...propsDataLoaded} />);
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').props().children).toEqual('10 Versions');
  });
});
