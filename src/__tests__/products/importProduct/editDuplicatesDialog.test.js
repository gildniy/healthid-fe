import React from 'react';
import { shallow } from 'enzyme';
import * as moxios from 'moxios';
import PropTypes from 'prop-types';
import { EditDuplicateSupplier } from '../../../components/products/ImportProduct/editProductDuplicates';
import GET_PRODUCTS_SUPPLIERS_CATEGORIES from '../../../queries/productsSuppliersCategoriesQuery';
import { resolvedRequest, rejectedRequest } from '../../../../__mocks__/axiosResponses';

describe('Render Edit existing Product component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  EditDuplicateSupplier.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        }
      }
    },
    editProduct: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          createProduct: {
            product: {
              productName: 'Para'
            }
          }
        };
        const res = { data };
        return resolve(res);
      })
    ),
    duplicateInformation: {
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
        },

        initialData: {
            business: {
                suppliersSet: [
                    {
                        id: "3yvodqdc0",
                        name: "ABC Supplier",
                        suppliersmetaSet: [
                            {displayName: "ABC Supplier (S-ABC799)"}
                        ]
                    }
                ]
            },
            productCategories: [
                {
                    id: "25",
                    name: "beauty",
                    loyaltyWeight: 0,
                    isVatApplicable: true,
                    markup: 0
                }
            ],
            dispensingSize: [
                {
                    id: "1",
                    name: "tablets"
                }
            ]
        }
  };

  const mocks = [
    {
      request: {
        query: GET_PRODUCTS_SUPPLIERS_CATEGORIES,
      },
      result: {
        data: {
          approvedSuppliers: [
            {
              id: 'bu5ixuq72',
              name: 'Unilever'
            }
          ],
          productCategories: [
            {
              id: '45',
              name: 'Anti-Bacterial',
              loyaltyWeight: 2,
              isVatApplicable: true,
              markup: 10
            }
          ],
          dispensingSize: [
            {
              id: '2',
              name: 'syrup'
            }
          ],
          products: [
            {
              id: '261',
              productName: 'Panadol',
              isApproved: true
            },
            {
              id: '262',
              productName: 'Chloroform',
              isApproved: true
            }
          ]
        }
      }
    }
  ];

  const crop = {
    x: 0,
    y: 10,
    width: 200,
    height: 200,
    aspect: 1 / 1
  };

  const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });

  const validFile = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const invalidFile = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'text/csv',
      lastModified: ''
    }
  ];

  const data = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const largeFile = [
    {
      name: 'eucerin',
      size: 1000000000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const fileName = 'eucerin';

  it('calls handle change function', () => {
    const event = {
      target: {
        name: 'brand',
        value: 'Biersdorf'
      }
    };

    const value = 'Biersdorf';

    const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });
    wrapper.instance().handleChange(event);
    expect(wrapper.state().brand).toEqual(value);
  });

  it('calls handleAddition', () => {
    const tag1 = 'pain';
    const result1 = ['pain'];

    const tag2 = 'headache';
    const result2 = ['pain', 'headache'];

    const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });
    wrapper.instance().handleAddition(tag1);
    expect(wrapper.state().tags).toEqual(result1);
    wrapper.instance().handleAddition(tag2);
    expect(wrapper.state().tags).toEqual(result2);
  });

  it('calls handleDelete', () => {
    const initialArray = ['pain', 'headache'];
    const finalArray = ['pain'];

    const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });
    wrapper.setState({ tags: initialArray });
    wrapper.instance().handleDelete(1);
    expect(wrapper.state().tags).toEqual(finalArray);
  });

  it('calls handleEditProductDuplicate product', async () => {
    const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });
    wrapper.instance().handleEditProductDuplicate();
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('calls handleEditProduct', () => {
    const wrapper = shallow(<EditDuplicateSupplier {...props} />, { context });
    wrapper.instance().handleEditProduct();
  });

  it('calls onSelectFile function on a large image file', () => {
    const e = {
      target: {
        files: largeFile
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile function on a non-image file', () => {
    const e = {
      target: {
        files: invalidFile
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile function on a image file', () => {
    const validFile = new File([new Blob()], 'image.jpg', {
      name: 'profile',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    });
    const e = {
      target: {
        files: [validFile]
      }
    };
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls getCroppedImage function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(validFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange function', () => {
    wrapper.instance().handleOnCropChange(crop);
    expect(wrapper.state().crop).toEqual(crop);
  });

  it('calls handleClose function', () => {
    const url = `${process.env.CLOUDINARY_URL}`;
    moxios.stubRequest(`${url}`, resolvedRequest);
    const spy = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    wrapper.setState({ imageFile: validFile });
    expect(wrapper.state().src).toEqual('');
    expect(wrapper.state().open).toBeFalsy();
    wrapper.instance().handleImageDrop(wrapper.state().imageFile);
    expect(spy).toHaveBeenCalled();
  });
  it('calls handleClose function', () => {
    const url = `${process.env.CLOUDINARY_URL}`;
    moxios.stubRequest(`${url}`, rejectedRequest);
    const spy = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    wrapper.setState({ imageFile: validFile });
    expect(wrapper.state().src).toEqual('');
    expect(wrapper.state().open).toBeFalsy();
    wrapper.instance().handleImageDrop(wrapper.state().imageFile);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleSave function', () => {
    wrapper.instance().getCroppedImg = jest.fn(() => Promise.resolve(data));

    wrapper.instance().handleSave();
    wrapper.setState({
      src: 'image-src',
      fileName: 'eucerin',
      crop
    });
    expect(wrapper.instance().getCroppedImg).toHaveBeenCalled();
  });
});
