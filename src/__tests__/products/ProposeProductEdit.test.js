import React from 'react';
import { shallow } from 'enzyme';
import * as moxios from 'moxios';
import PropTypes from 'prop-types';
import { ProposeProductEdit } from '../../components/products/ProposeProductEdit';
import GET_PRODUCTS_SUPPLIERS_CATEGORIES from '../../queries/productsSuppliersCategoriesQuery';
import { resolvedRequest, rejectedRequest } from '../../../__mocks__/axiosResponses';

describe('Render Add Product component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  ProposeProductEdit.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()];

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
        },
        outlets: [
          {
            business: {
              id: 'hu32h2j2'
            }
          }
        ]
      }
    },
    client: {
      query: jest.fn(
        () => new Promise((resolve) => {
          const data = {
            product: {
              productName: 'Para',
              tags: ['x']
            },
            filterSuppliers: {
              edges: [{ node: 'x' }]
            }
          };
          const res = { data };
          return resolve(res);
        })
      )
    },
    match: {
      params: {
        id: 212
      }
    },
    proposeEdit: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          updateProduct: {
            product: {
              productName: 'Para'
            }
          }
        };
        const res = { data };
        return resolve(res);
      })
    )
  };

  const propsCashier = {
    classes: {},
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Cashier' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        },
        outlets: [
          {
            business: {
              id: 'hu32h2j2'
            }
          }
        ]
      }
    },
    client: {
      query: jest.fn(
        () => new Promise((resolve) => {
          const data = {
            product: {
              productName: 'Para',
              dispensingSize: {
                id: 'x'
              },
              productCategory: {
                id: 'x'
              },
              preferredSupplier: {
                id: 'x'
              },
              backupSupplier: {
                id: 'x'
              },
              tags: ['x']
            }
          };
          const res = { data };
          return resolve(res);
        })
      )
    },
    match: {
      params: {
        id: 212
      }
    },
    proposeEdit: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          updateProduct: {
            product: {
              productName: 'Para'
            }
          }
        };
        const res = { data };
        return resolve(res);
      })
    )
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

  const wrapperTemplate = (props) => shallow(<ProposeProductEdit {...props} />, { context });

  const wrapper = wrapperTemplate(props);
  const wrapperCashier = wrapperTemplate(propsCashier);

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

    wrapper.instance().handleChange(event);
    expect(wrapper.state().brand).toEqual(value);
  });

  it('calls handle filter suppliers', () => {
    const event = {
      target: {
        name: 'supplier',
        value: 'Uni'
      }
    };

    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleChange(event, props.client);
    expect(wrapper.state().anchorEl).toEqual(event.target);
  });

  it('calls handle product name change function', () => {
    const event = {
      target: {
        name: 'productName',
        value: 'nexium'
      }
    };

    wrapper.setState({ products: [{ productName: 'nexium' }] });

    wrapper.instance().handleProductName(event);
    expect(wrapper.state().productName).toEqual('nexium');
  });

  it('calls handle category change function', () => {
    const event = {
      value: 1,
      label: 'New'
    };
    const productCategories = [{
      id: 1,
      loyaltyWeight: 1,
      isVatApplicable: false
    }];
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleCategoryChange(event, productCategories);
    expect(wrapper.instance().state.categoryId).toBe(1);
  });

  it('calls handle category change function', () => {
    const event = {
      value: 1,
      label: 'New'
    };
    const productCategories = [{
      id: 1,
      loyaltyWeight: 1,
      isVatApplicable: true
    }];
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleCategoryChange(event, productCategories);
    expect(wrapper.instance().state.categoryId).toBe(1);
  });

  it('calls handleAddition', () => {
    const tag1 = 'pain';
    const result1 = ['pain'];

    const tag2 = 'headache';
    const result2 = ['pain', 'headache'];

    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleAddition(tag1);
    expect(wrapper.state().tags).toEqual(result1);
    wrapper.instance().handleAddition(tag2);
    expect(wrapper.state().tags).toEqual(result2);
  });

  it('calls handleDelete', () => {
    const initialArray = ['pain', 'headache'];
    const finalArray = ['pain'];

    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.setState({ tags: initialArray });
    wrapper.instance().handleDelete(1);
    expect(wrapper.state().tags).toEqual(finalArray);
  });

  it('calls handlePropose edit', async () => {
    wrapper.instance().handleProposeEdit();
    wrapper.setState({ tags: [{ text: 'x' }] });
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('calls handlePropose edit for cashiers', async () => {
    wrapperCashier.instance().handleProposeEdit();
    wrapper.setState({ tags: [{ text: 'x' }] });
    expect(wrapperCashier.state().loading).toBeTruthy();
  });

  it('calls handleVatChange', () => {
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleVatChange({
      label: 'VAT',
      value: true
    });
    expect(wrapper.state().vatName).toEqual('VAT');
    expect(wrapper.state().vatStatus).toEqual(true);
  });


  it('calls displaySelected', () => {
    const active = 'preferredSupplier'
    const name ='swaibu'
    const id = 22
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().displaySelected(active, name, id);
    expect(wrapper.state().preferredSupplier).toEqual('swaibu');
  });

  it('calls displaySelected', () => {
    const active = 'preferred'
    const name ='swaibu'
    const id = 22
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().displaySelected(active, name, id);
    expect(wrapper.state().preferred).toEqual('swaibu');
    expect(wrapper.state().backupSupplierId).toEqual(22);
  });

  it('calls popperClickAway', () => {
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().popperClickAway();
    expect(wrapper.state().openPopper).toEqual(false);
  });

  it('calls handleDispensingSizeChange', () => {
    const event = { target: { label: 'daily', value:'hello' } };
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleDispensingSizeChange(event);
    expect(wrapper.state().suppliers).toEqual([]);
  });

  it('calls handleSendForApproval', () => {
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleSendForApproval();
  });

  it('calls popperClickAway', () => {
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().popperClickAway();
    expect(wrapper.state().openPopper).toEqual(false);
  });

  it('calls handleDispensingSizeChange', () => {
    const event = { target: { label: 'daily', value: 'hello' } };
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().handleDispensingSizeChange(event);
    expect(wrapper.state().suppliers).toEqual([]);
  });

  it('calls displaySelected', () => {
    const active = 'preferredSupplier';
    const name = 'sell';
    const id = 22;
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().displaySelected(active, name, id);
    expect(wrapper.state().preferredSupplier).toEqual('sell');
  });
  it('calls displaySelected', () => {
    const active = 'preferred';
    const name = 'sell';
    const id = 22;
    const wrapper = shallow(<ProposeProductEdit {...props} />, { context });
    wrapper.instance().displaySelected(active, name, id);
    expect(wrapper.state().preferred).toEqual('sell');
    expect(wrapper.state().backupSupplierId).toEqual(22);
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

  it('should disable the save button when incomplete', () => {
    wrapper.setState({
      productName: 'productName',
      brand: 'brand',
      manufacturer: 'manufacturer',
      productDescription: 'productDescription',
      preferredSupplierId: 'preferredSupplierId',
      backupSupplierId: 'backupSupplierId',
      categoryId: 'categoryId',
      dispensingSizeId: ''
    });
    const {
      productName,
      brand,
      manufacturer,
      productDescription,
      preferredSupplierId,
      backupSupplierId,
      categoryId,
      dispensingSizeId
    } = wrapper.state();

    expect(!productName || !brand || !manufacturer || !productDescription
      || !preferredSupplierId || !backupSupplierId || !categoryId
      || !dispensingSizeId).toBeTruthy();
  });
});
