import React from 'react';
import { shallow } from 'enzyme';
import ProductDescriptions from '../../../components/products/AddProduct/Inputs/ProductDescriptions';


describe('Render Add Product component', () => {
  const props = {
    productName: '',
    handleChange: jest.fn(),
    productDescription: '',
    globalUpc: '12345678'
  };


  it('renders without crashing', () => {
    const newProps = {...props, globalUpc: null}
    const wrapper = shallow(<ProductDescriptions {...newProps } />);
    expect(wrapper.find('.name').length).toBe(1);
    expect(wrapper.find('.description').length).toBe(1);
  });

  it('should handle validation of UPC', () => {
    const wrapper = shallow(<ProductDescriptions {...props} />);
    const upcField = wrapper.find('[name="globalUpc"]')
    upcField.simulate('input', {target: {name: 'globalUpc', value: '12345678sdf'}})
    expect(upcField.props().value).toEqual('12345678')
  });

});