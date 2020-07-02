import React from 'react';
import { shallow } from 'enzyme';
import TagInput from '../../../components/products/ImportProduct/Inputs/Tags';


describe('Render Edit Product component', () => {
  const props = {
    tags: [],
    handleAddition: jest.fn(),
    handleDelete: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<TagInput {...props} />);
    expect(wrapper.find('.tags-container').length).toBe(1);
  });
});
