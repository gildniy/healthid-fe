import React from 'react';
import { shallow, mount } from 'enzyme';
import * as moxios from 'moxios';
import { resolvedRequest, rejectedRequest } from '../../../../__mocks__/axiosResponses';
import '../../../../__mocks__/window';
import PropTypes from 'prop-types';
import { ImportProduct } from '../../../components/products/ImportProduct/ImportProduct';

describe('Render ImportProduct Component', () => {
  const props = {
    session: {
      me: {
        mobileNumber: '254123123123', 
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        businessUser: {
          id: '123',
          user: {
            id: '23'
          }
        }
      }
    }
  };

  const acceptedFiles = [
    {
      name: 'producta',
      size: 10000,
      type: 'text/csv',
      lastModified: ''
    }
  ];

  const expectedFile = {
    name: 'producta',
    size: 10000,
    type: 'text/csv',
    lastModified: ''
  };

  const duplicate =  [{
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
    }];

  global.setTimeout = jest.fn();

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  ImportProduct.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  const wrapper = shallow(<ImportProduct {...props} />, { context });

  it('wrapper.instance().handleDownloadTemplate()', () => {
    const csvUrl = `${process.env.APP_LINK}`;
    moxios.stubRequest(`${csvUrl}sample_csv_file/products`, resolvedRequest);
    wrapper.instance().handleDownloadTemplate();
  });

  it('wrapper.instance().handleDownloadTemplate()', () => {
    const csvUrl = `${process.env.APP_LINK}`;
    moxios.stubRequest(`${csvUrl}sample_csv_file/products`, rejectedRequest);
    wrapper.instance().handleDownloadTemplate();
  });

  it('wrapper.instance().handleUpload()', () => {
    const csvUrl = `${process.env.APP_LINK}`;
    moxios.stubRequest(`${csvUrl}csv/products`, resolvedRequest);
    wrapper.instance().handleUpload();
  });

  it('wrapper.instance().handleUpload()', () => {
    const csvUrl = `${process.env.APP_LINK}`;
    moxios.stubRequest(`${csvUrl}csv/products`, rejectedRequest);
    wrapper.instance().handleUpload();
  });

  it('calls handleFile', () => {
    const newProps = {
      state: { file: '' },
      ...props
    };

    const e = {
      target: {
        files: acceptedFiles
      }
    };
    const wrapperWithFileProp = shallow(<ImportProduct {...newProps} />, { context });
    wrapperWithFileProp.instance().handleFile(e);
    expect(wrapperWithFileProp.state().file).toEqual(expectedFile);
  });

  it('calls onDrop', () => {
    wrapper.instance().onDrop(acceptedFiles);
    expect(wrapper.state().file).toEqual(expectedFile);
  });

  it('calls handleDownloadTemplate', () => {
    const url = 'https://healthid-web-api.herokuapp.com/healthid/sample_csv_file/products';
    wrapper.instance().handleDownloadTemplate();
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: [
          'Product Category,Product Name,Dispensing Size,Description,Brand,Manufacturer,Vat Status,Preferred Supplier,Backup Supplier,Tags'
        ]
      }
    });
  });

  it('calls handleUpload', () => {
    const url = 'https://healthid-web-api.herokuapp.com/healthid/csv/products';
    wrapper.instance().handleUpload();
    expect(wrapper.state().loading).toEqual(true);
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: {
          noOfProductsAdded: 12
        }
      }
    });
  });
  
  it('calls handleViewProductDuplicates', () => {
    wrapper.instance().handleViewProductDuplicates();
    expect(wrapper.state().openProductDetailsDialog).toEqual(true);
  });

  it('calls handleCloseProductDuplicates', () => {
    wrapper.instance().handleCloseProductDuplicates();
    expect(wrapper.state().openProductDetailsDialog).toEqual(false);
  });

  it('calls handleViewEditDuplicates', () => {
    wrapper.instance().handleViewEditDuplicates(duplicate);
    expect(wrapper.state().openProductDetailsDialog).toEqual(false);
    expect(wrapper.state().openDuplicateEditDialog).toEqual(true);
    expect(wrapper.state().duplicateInformation).toEqual(duplicate);
  });

  it('calls handleCloseEditDuplicates', () => {
    wrapper.instance().handleCloseEditDuplicates();
    expect(wrapper.state().openProductDetailsDialog).toEqual(true);
    expect(wrapper.state().openDuplicateEditDialog).toEqual(false);
  });

  it('calls onProductDuplication', () => {
    const newProps = {
      state: { onDuplicationActions: {} },
      ...props
    };

    let product = 'codein';
    const action = 'skip';

    const onDuplication = { 'codein': 'skip' }

    const wrapperWithFileProp = shallow(<ImportProduct {...newProps} />, { context });
    wrapperWithFileProp.instance().onProductDuplication(product, action);
    expect(wrapperWithFileProp.state().onDuplicationActions).toEqual(onDuplication);
  });
});
