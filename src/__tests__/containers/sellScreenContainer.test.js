import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import MockComponent from '../../../__mocks__/mockComponent';
import GET_FILTERED_PRODUCTS from '../../queries/productsQueries/filteredProductsQuery';
import PropTypes from 'prop-types';
import { SellScreenContainer } from '../../containers/sellScreenContainer';

import { StateContext } from '../../providers/stateProvider';

jest.mock('../../components/sell/returnTableRow', () => MockComponent);

const contextState = {
  customers: {
    isSelected: true,
    openDialog: false,
  },
  sell: {
    cart: [],
    totalToPay: 10,
    currency: ''
  }
}

const context = [contextState, jest.fn()]

const product = {
  quantity: 10,
  quantityInStock: 2,
  batchId: '4937hrjk',
  discount: '500',
  salesPrice: 100,
  note: '',
};
const selectedProductBatches = [product]

const props = {
  products: [{
    id: 1,
    productName: 'Panadol',
    quantityInStock: 10,
    business: {
      outletSet: [{ outletpreference: { outletCurrency: { symbol: '#' } } }]
    }
  }],
  session: {
    me: {
      users: [{ id: 1 }],
      activeOutlet: {
        outletpreference: {
          outletTimezone: { name: 'Africa/Nairobi' },
          outletCurrency: { symbol: '' }
        }
      },
      outlets: [ { id: 1 } ]
    }
  },
  countries: [{
    id: 1, name: 'Uganda', citySet: [{ id: '1', name: 'Kampala' }]
  }],
  cities: [{ id: '1', name: 'Kampala' }],
  customers: [{ id: 1, name: 'Ronald' }],
  initialDataRefetch: jest.fn(),
};

const client = {
  query: ({ }) => jest.fn(),
  watchQuery: jest.fn(),
}

describe('SellScreenContainer with InitialData', () => {

  it('renders without crashing', async () => {
    const wrapper = shallow((
      <BrowserRouter>
        <ApolloProvider client={client}>
          <StateContext.Provider value={context}>
            <SellScreenContainer {...props} />
          </StateContext.Provider>
        </ApolloProvider>
      </BrowserRouter>
    ));
    await wait(0);
  });
});

describe('SellScreenContainer', () => {
  SellScreenContainer.contextTypes = [
    PropTypes.object,
    PropTypes.func
  ];

  const wrapper = shallow(
    <SellScreenContainer {...props} />, { context }
  );
  beforeEach(() => {
    wrapper.instance().setState({
      customer: [],
      openCustomerDialog: false,
      isSelected: '',
      id: '',
      email: '',
      emergencyContactEmail: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      firstName: '',
      lastName: '',
      loyaltyMember: false,
      primaryMobileNumber: '',
      secondaryMobileNumber: '',
      selectedProductBatches
    });
  });
  it('handles input change', () => {
    const event = { target: { value: 'self', name: 'buyingForValue' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state('buyingForValue')).toEqual('self');
  });
  it('does not filter products when searchValue is less than 2 characters', async () => {
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        resolve([{ name: "name" }]);
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('t') }
    wrapper.instance().filterProducts(client, 't');
    await wait(0);
    expect(wrapper.instance().state.filteredProducts.length).toBe(0);
  });
  it('filters products when searchValue is more than 2 characters', async () => {
    const mocks = [
      {
        request: {
          query: GET_FILTERED_PRODUCTS
        },
        result: {
          data: {
            filterProducts: {
              edges: [
                {
                  node: {
                    id: "261",
                    productCategory: {
                      name: "pain killer"
                    },
                    productName: "Panadol",
                    dispensingSize: {
                      name: "tablets"
                    },
                    business: {
                      outletSet: {
                        outletpreference: {
                          outletCurrency: {
                            symbol: "₦"
                          }
                        }
                      }
                    },
                    image: "https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg",
                    skuNumber: "000261",
                    description: "Nice meds, they mess you real good",
                    brand: "Stans",
                    manufacturer: "Stans",
                    quantityInStock: 85,
                    salesPrice: 408.0,
                    tags: []
                  }
                }
              ]
            }
          }
        }
      }
    ];
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        return resolve(
          {
            data: {
              filterProducts: {
                edges: [
                  {
                    node: {
                      id: "261",
                      productCategory: {
                        name: "pain killer"
                      },
                      productName: "Panadol",
                      dispensingSize: {
                        name: "tablets"
                      },
                      business: {
                        outletSet: {
                          outletpreference: {
                            outletCurrency: {
                              symbol: "₦"
                            }
                          }
                        }
                      },
                      image: "https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg",
                      skuNumber: "000261",
                      description: "Nice meds, they mess you real good",
                      brand: "Stans",
                      manufacturer: "Stans",
                      quantityInStock: 85,
                      salesPrice: 408.0,
                      tags: []
                    }
                  }
                ]
              }
            }
          });
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('pana') }
    wrapper.instance().filterProducts(client, 'pana');
    await wait(0);
    expect(wrapper.instance().state.filteredProducts.length).toBe(1);
  });
  it('handles note change', () => {
    const event = { target: { value: 'cool', name: 'cartItemNoteValue' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state('cartItemNoteValue')).toEqual('cool');
  });
  it('handle Customer Input Change', () => {
    const placement = '';
    const event = { currentTarget: '', target: { value: 'John' } };
    wrapper.instance().handleCustomerInputChange(placement)(event);
    expect(wrapper.state('firstName')).toEqual('John');
  });
  it('sets Initials', () => {
    const customer = { firstName: 'John', lastName: 'Paul' };
    wrapper.instance().getInitials(customer);
  });
  it('handle Discard Sale Button', () => {
    const cartItems = [{ id: 1, productName: 'Panadol' }];
    wrapper.setState({ cartItems });
    wrapper.instance().handleDiscardSaleButton();
    expect(wrapper.state('cartItems')).toStrictEqual([]);
  });
  it('handles Hold Sale Button', () => {
    wrapper.instance().handleHoldSaleButton();
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
  it('handles Sales OnHold Button', () => {
    wrapper.instance().handleSalesOnHoldButton();
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
  it('handles Discount Click', () => {
    expect(wrapper.find('AddDiscountPopper').exists()).toBeFalsy;
    const currentTarget = { id: 'discount-input' };
    const event = { currentTarget };
    wrapper.instance().handleDiscountClick(event);
    expect(wrapper.find('AddDiscountPopper').exists()).toBeTruthy;
  });
  it('handles NoteInPutChange', () => {
    const event = { target: { value: 'new', name: 'mainCartNote' } };
    wrapper.instance().handleNoteInPutChange(event);
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
  it('handle Add New Customer', () => {
    wrapper.instance().handleAddNewCustomer();
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
  it('handle Primary Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handlePrimaryPhoneChange(value);
    expect(wrapper.state('primaryMobileNumber')).toStrictEqual('0782456734');
  });
  it('handle Secondary Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handleSecondaryPhoneChange(value);
    expect(wrapper.state('secondaryMobileNumber')).toStrictEqual('0782456734');
  });
  it('handle Contact Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handleContactPhoneChange(value);
    expect(wrapper.state('emergencyContactNumber')).toStrictEqual('0782456734');
  });
  it('handle setCityId', () => {
    const value = 'Kampala';
    const city = {name: value, id: '1'}
    wrapper.setState({ cityId: '', cities:[city] });
    wrapper.instance().setCityId(value);
    expect(wrapper.state('cityId')).toStrictEqual(1);
  });
  it('handle setCityId with undefined value', () => {
    const value = '';
    wrapper.setState({ cityId: '' });
    wrapper.instance().setCityId(value);
    expect(wrapper.state('cityId')).toStrictEqual('');
  });
  it('handle updateCustomers when one is selected', () => {
    const cache = {};
    const customers = [{ id: 1 }, { id: 2 }];
    wrapper.setState({ customers, });
    const data = {
      data: {
        createCustomer: { customer: { id: 3 } },
        editCustomerBasicProfile: { customer: { id: 3 } }
      }
    };
    wrapper.instance().updateCustomers(cache, data);
    expect(wrapper.state('customers')).toHaveLength(4);
  });
  it('handle updateCustomers on create', () => {
    const contextState = {
      customers: {
        isSelected: false,
        openDialog: false,
      },
      sell: {
        cart: [],
        totalToPay: 10,
        currency: ''
      }
    }
    const context = [contextState, jest.fn()]
    const newWrapper = shallow(
      <SellScreenContainer {...props} />, { context }
    );

    const cache = {};
    const customers = [{ id: 1 }, { id: 2 }];
    newWrapper.setState({ customers });
    const data = {
      data: {
        createCustomer: { customer: { id: 3 } },
        editCustomerBasicProfile: { customer: { id: 3 } }
      }
    };
    newWrapper.instance().updateCustomers(cache, data);
    expect(newWrapper.state('customers')).toHaveLength(3);
  });
  it('handle updateCustomers on edit', () => {
    const cache = {};
    wrapper.setState({ isSelected: true, });
    const data = { data: { editCustomerBasicProfile: { customer: { id: 3 } } } };
    wrapper.instance().updateCustomers(cache, data);
    expect(wrapper.state('customers')).toHaveLength(4);
  });
  it('render Single Customer', () => {
    const customer = { id: 1, name: 'John' };
    const isSelected = '';
    wrapper.instance().renderSingleCustomer(customer, isSelected);
    expect(wrapper.state('firstName')).toStrictEqual('');
  });
  it('removes Selected Customer', () => {
    wrapper.instance().removeSelectedCustomer();
    expect(wrapper.state('firstName')).toStrictEqual('');
  });
  it('handles Display Selected Customer', () => {
    const customer = {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      primaryMobileNumber: '',
      secondaryMobileNumber: '',
      region: '',
      loyaltyMember: true,
      city: { name: '' },
      country: { id: 1, name: '' },
      emergencyContactName: '',
      emergencyContactEmail: '',
      emergencyContactNumber: '',
    };
    const isSelected = true;
    const spy = jest.spyOn(wrapper.instance(), 'handleDisplayCustomerDetails');
    wrapper.instance().handleDisplaySelectedCustomer(customer, isSelected);
    expect(spy).toHaveBeenCalled();
  });
  it('handles set Locations', () => {
    const dispatch = jest.fn();
    wrapper.setState({ country: 'Uganda' });
    wrapper.instance().setLocations(dispatch);
    expect(wrapper.state('country')).toStrictEqual('Uganda');
  });
  it('handles update Items', () => {
    const spy = jest.spyOn(wrapper.instance(), 'calculateTotal');
    const itemsArray = [{
      id: 1,
      productName: 'John',
      quantity: 2,
      salesPrice: 10,
      discount: 5
    }];
    wrapper.instance().updateItems(itemsArray);
    expect(spy).toHaveBeenCalled();
  });
  it('handles Cart Total', () => {
    const spy = jest.spyOn(wrapper.instance(), 'totalSum');
    const cartItems = [{
      discountedTotal: [10, 20]
    }];
    wrapper.instance().renderCartTotal(cartItems);
    expect(spy).toHaveBeenCalled();
  });
  it('render Cart Discount', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCartTotal');
    const cartItems = [{
      discountedTotal: [10, 20]
    }];
    wrapper.instance().renderCartDiscount(cartItems);
    expect(spy).toHaveBeenCalled();
  });
  it('render Grand Total', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCartTotal');
    const cart = [{
      id: 1,
      productName: '',
      quantity: 10,
      salesPrice: 11,
      dispensingSize: ''
    }];
    const discount = 10;
    wrapper.instance().renderGrandTotal(cart, discount);
    expect(spy).toHaveBeenCalled();
  });
  it('switch Component Rendering with search value', async () => {
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        resolve([{ name: "name" }]);
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('pan') }
    const spy = jest.spyOn(wrapper.instance(), 'filterProducts');
    const event = { target: { name: 'searchValue', value: 'pan' } };

    wrapper.instance().handleChange(event, client);
    expect(spy).toHaveBeenCalled();
  });
  it('handles ClickToPay', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderGrandTotal');
    wrapper.instance().handleClickToPay();
    expect(spy).toHaveBeenCalled();
  });
  it('handles ClosePaymentDialog', () => {
    wrapper.instance().handleClosePaymentDialog();
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
  it('handles renderSearchBar', () => {
    const searchValue = 'new'
    wrapper.instance().renderSearchBar(searchValue);
  });
});
