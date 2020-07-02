import React from 'react';
import { mount } from 'enzyme';
import ProductCard from '../../../components/sell/productCard';

const product = {
  productName: 'Amoxycilin',
  image: '',
  salesPrice: 100,
  productCategory: { name: 'JIJI' },
  dispensingSize: { name: 'Tin' },
}

const props = {
  classes: {},
  product,
  currency: '₦',
  handleClickViewDetails: jest.fn(),
};
describe('ProductCard', () => {
  const wrapper = mount((
    <ProductCard {...props} />
  ));

  it('renders ProductCard component', () => {
    expect(wrapper.find('ForwardRef(Paper)').length).toBe(1);
  });
  it('handles "NULL" dispensingSize', () => {
    wrapper.setProps({
      product: { ...product, dispensingSize: { name: 'NULL' } }
    })
    expect(wrapper.find('ForwardRef(Typography)').at(2).text())
      .toBe('no Dispensing size');
  });
  it('handles ProductCard onClick', () => {
    wrapper.find('ForwardRef(Paper)').props().onClick()
    expect(props.handleClickViewDetails).toHaveBeenCalled;
  });
});
