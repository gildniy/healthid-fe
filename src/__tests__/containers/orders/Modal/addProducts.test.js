import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import GET_FILTERED_PRODUCTS from '../../../../queries/productsQueries/filteredProductsQuery';
import { AddProducts } from '../../../../containers/orders/Modal/AddProducts';

const manualProductsResponse = {
  data: {
    data: {
      manualAddProduct: {
        message: 'Products added successfully',
      }
    }
  }
};

const propsOne = {
  addOrderItems: jest.fn(() => Promise.resolve({
    data: {
      manualAddProduct: {
        message: 'Products added successfully'
      }
    }
  })),
  filterProducts: jest.fn(),
  handleChange: jest.fn(),
  addProductsToList: jest.fn(),
  popperClickAway: jest.fn()
};

const propsTwo = {
  addOrderItems: jest.fn(() => Promise.reject(new Error('Server error'))),
  filterProducts: jest.fn(),
  handleChange: jest.fn(),
  addProductsToList: jest.fn(),
  popperClickAway: jest.fn()
};

describe('Test Add Products Modal Component - Positive Case', () => {
  const wrapper = shallow(
    <AddProducts {... propsOne} />
  );

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should open the modal', () => {
    const addProductsButton = wrapper.find('WithStyles(Component)').at(0);
    addProductsButton.props().onClickHandler();
    const paper = wrapper.find('WithStyles(ForwardRef(Paper))');
    expect(paper.length).toEqual(1);
  });

  it('should handle change', () => {
    const event = {
      target: {
        name: 'productName',
        value: 'Coartem'
      }
    };

    const client = {
      query: jest.fn(() => Promise.resolve({
        data: {
          filterProducts: {
            edges: [
              {
                node: {
                  id: "150",
                  productCategory: {
                    name: "Malaria Cure"
                  },
                  productName: "Coartem",
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
                  }
                }
              }
            ]
          }
        }
      }))
    };

    const spyHandleChange = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().handleChange(event, client);

    expect(spyHandleChange).toHaveBeenCalledWith(event, client);
  });

  it('should add products to list', () => {
    const product = { name: 'Coartem' }
    const spyOnAddProduct = jest.spyOn(wrapper.instance(), 'addProductToList');

    wrapper.instance().addProductToList(product);
    wrapper.instance().popperClickAway();

    expect(spyOnAddProduct).toHaveBeenCalledWith(product);
  })

  it('should close the modal', () => {
    const closeButton = wrapper.find('WithStyles(Component)').at(2);
    closeButton.props().onClickHandler();
  });

  it('should save products', () => {
    const saveButton = wrapper.find('WithStyles(Component)').at(1);
    saveButton.props().onClickHandler();
  });
});

describe('Test Add Products Modal Component - Negative Case', () => {
  const wrapper = shallow(
    <AddProducts {... propsTwo} />
  );

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should open the modal', () => {
    const addProductsButton = wrapper.find('WithStyles(Component)').at(0);
    addProductsButton.props().onClickHandler();
    const paper = wrapper.find('WithStyles(ForwardRef(Paper))');
    expect(paper.length).toEqual(1);
  });

  it('should handle change', () => {
    const event = {
      target: {
        name: 'productName',
        value: 'Coartem'
      }
    };

    const client = {
      query: jest.fn(() => Promise.reject())
    };

    const spyHandleChange = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().handleChange(event, client);

    expect(spyHandleChange).toHaveBeenCalledWith(event, client);
  });

  it('should close the modal', () => {
    const closeButton = wrapper.find('WithStyles(Component)').at(2);
    closeButton.props().onClickHandler();
  });

  it('should save products', () => {
    const saveButton = wrapper.find('WithStyles(Component)').at(1);
    saveButton.props().onClickHandler();
  });
});

describe('Test InitiatedOrder Component - With Client', () => {
  let wrapper;
  beforeEach(() => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_FILTERED_PRODUCTS,
      () => Promise.resolve(manualProductsResponse)
    );

    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <AddProducts {...propsOne} />
      </ApolloProvider>
    );
  });

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });
});
