import React from 'react';
import { shallow } from 'enzyme';
import SubmitFile from '../../../components/products/ImportProduct/SubmitFile';


describe('Render SubmitFile component', () => {
  it('renders without crashing', () => {
    const props = {
      file: {},
      handleUpload: jest.fn(),
      handleUploadFailed: jest.fn(),
      handleViewProductDuplicates: jest.fn(),
      loading: false,
      serverResponse: '',
      serverDuplicateResponseMsg: '',
      serverDuplicateResponse: [
        {
            row: 1,
            message: "Omeprazole, already exists!",
            data: {
                product_category: "beauty", 
                product_name: "Omeprazole", 
                dispensing_size: "Tablets", 
                description: "Dosage", 
                brand: "ABC",
                manufacturer: "Manufacturer",
                vat_status: "Vat",
                preferred_supplier: "ABC Supplier (S-ABC799)",
                backup_supplier: "Isaie store (S-ISA571)",
                loyalty_weight: "2",
                image: "",
                tags: ""
            },
            conflicts: [
                {
                    id: 25,
                    product_name: "Omeprazole",
                    sku_number: null
                }
            ]
        }
      ],
      duplications: [
        {
            row: 1,
            message: "Omeprazole, already exists!",
            data: {
                product_category: "beauty", 
                product_name: "Omeprazole", 
                dispensing_size: "Tablets", 
                description: "Dosage", 
                brand: "ABC",
                manufacturer: "Manufacturer",
                vat_status: "Vat",
                preferred_supplier: "ABC Supplier (S-ABC799)",
                backup_supplier: "Isaie store (S-ISA571)",
                loyalty_weight: "2",
                image: "",
                tags: ""
            },
            conflicts: [
                {
                    id: 25,
                    product_name: "Omeprazole",
                    sku_number: null
                }
            ]
        }
    ]
    };
    const wrapper = shallow(<SubmitFile {...props} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('.file-item').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('.file-text').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('.file-name').length).toBe(1);
    expect(wrapper.find('.file-submit').length).toBe(1);
    expect(wrapper.find('.file-submit-btn').length).toBe(1);
  });

  it('renders the server response if there is any', () => {
    const props = {
      file: {},
      handleUpload: jest.fn(),
      handleUploadFailed: jest.fn(),
      handleViewProductDuplicates: jest.fn(),
      loading: true,
      serverResponse: '20 products have been uploaded for approval',
      serverDuplicateResponse: [
        {
            row: 1,
            message: "Omeprazole, already exists!",
            data: {
                product_category: "beauty", 
                product_name: "Omeprazole", 
                dispensing_size: "Tablets", 
                description: "Dosage", 
                brand: "ABC",
                manufacturer: "Manufacturer",
                vat_status: "Vat",
                preferred_supplier: "ABC Supplier (S-ABC799)",
                backup_supplier: "Isaie store (S-ISA571)",
                loyalty_weight: "2",
                image: "",
                tags: ""
            },
            conflicts: [
                {
                    id: 25,
                    product_name: "Omeprazole",
                    sku_number: null
                }
            ]
        }
      ],
      duplications: [
        {
            row: 1,
            message: "Omeprazole, already exists!",
            data: {
                product_category: "beauty", 
                product_name: "Omeprazole", 
                dispensing_size: "Tablets", 
                description: "Dosage", 
                brand: "ABC",
                manufacturer: "Manufacturer",
                vat_status: "Vat",
                preferred_supplier: "ABC Supplier (S-ABC799)",
                backup_supplier: "Isaie store (S-ISA571)",
                loyalty_weight: "2",
                image: "",
                tags: ""
            },
            conflicts: [
                {
                    id: 25,
                    product_name: "Omeprazole",
                    sku_number: null
                }
            ]
        }
    ],
    serverDuplicateResponseMsg: '1 products were not added because they already exist',
    };
    const wrapper = shallow(<SubmitFile {...props} />);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('.file-span').length).toBe(1);
  });
});
