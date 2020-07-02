import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from '../../../components/products/AddProduct/ProductForm';

describe('Render Product Form component', () => {
  const props = {
    state: {
      productName: 'pink',
      productDescription: 'cool',
      productImage: '',
      imageFile: '',
      brand: 'new',
      manufacturer: 'biggie',
      preferredSupplierId: '5',
      backupSupplierId: 'newer',
      categoryId: '1',
      dispensingSizeId: '2',
      loyaltyWeight: '',
      vatStatus: '',
      tags: [],
      loading: false,
    },
    initialData: {
      business: {
        suppliersSet: [
          {
            id: 'bu5ixuq72',
            name: 'Unilever'
          },
          {
            id: '2',
            name: 'sean2'
          },
          {
            id: '1',
            name: 'first'
          }
        ],
      },
      productCategories: [
        {
          id: '45',
          name: 'Anti-Bacterial',
          loyaltyWeight: 2,
          isVatApplicable: true,
          markup: 10
        },
      ],
      dispensingSize: [
        {
          id: '2',
          name: 'syrup'
        },
        {
          id: '3',
          name: 'bottles'
        },
      ],
    },
    handleChange: jest.fn(),
    handleAddition: jest.fn(),
    handleDelete: jest.fn(),
    onDrop: jest.fn(),
    handleFile: jest.fn()
  };
  const wrapper = shallow(<ProductForm {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
  });

  it('renders with filled select fields without crashing ', () => {
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
  });

  it('checks all fields for disableButton option ', () => {
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
  });

  it('renders without supplierBusinesses', () => {
    const newProps = props;
    newProps.initialData.business.supplierBusiness = [];
    const newWrapper = shallow(<ProductForm {...newProps} />);
    expect(newWrapper.length).toBe(1);
  });
});
