import React from 'react';
import { mount } from 'enzyme';
import SearchList from '../../../components/sell/searchList';

const props = {
  product: {
    productName: 'Amoxycilin',
    image: '',
    salesPrice: 1000,
    batchInfo: [{
      id: 1,
      batchNo: 'OUT OF STOCK',
    }]
  },
  currency: '₦',
  handleClickViewDetails: jest.fn(),
};
describe('test SearchList component', () => {
  let wrapper;

  it('it renders SearchList component', () => {
    wrapper = mount((
      <SearchList {...props} />
    ));
    const list = wrapper.find('ForwardRef(List)').length;
    expect(list).toBe(1);
  });
  it('it renders SearchList component ListItem', () => {
    wrapper = mount((
      <SearchList {...props} />
    ));
    const listItem = wrapper.find('ForwardRef(ListItem)');
    listItem.simulate('click');
    expect(listItem.length).toBe(1);
  });
});
