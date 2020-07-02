import React from 'react';
import { shallow } from 'enzyme';
import { CustomToolBar } from '../../../../containers/orders/Table/CustomToolBar';

const resolvedData = {
  orderProducts: [{ id: '1' }],
  data: {
    assignSuppliersToProducts: {
      addedProductDetails: [{ id: '1'}]
    }
  }
}

const firstProps = {
  handleClickSearch: jest.fn(),
  isSearchActive: false,
  handleHideSearch: jest.fn(),
  handleTextChange: jest.fn(),
  numSelected: 1,
  selected: [1, 2, 3],
  selectedRow: [{
    name: 'product',
    sku: 123
  }],
  deselect: jest.fn(),
  filterSuppliers: jest.fn(),
  deleteProduct: jest.fn(() => Promise.resolve()),
  assignSupplier: jest.fn(() => Promise.resolve(resolvedData)),
  client: {
    readQuery: jest.fn().mockReturnValue(resolvedData),
    writeQuery: jest.fn()
  },
  autoFill: true,
  orderId: 10,
  filteredSuppliers: {
    edges: [
      {
        node: {
          id: '1',
          rating: 1,
          tier: {
            name: 'one'
          },
          isApproved: true,
          name: 'first',
          commentary: 'sfsd',
          suppliernoteSet: [],
          suppliersmetaSet: []
        }
      },
      {
        node: {
          id: '2',
          rating: 3,
          tier: {
            name: 'one'
          },
          isApproved: true,
          name: 'first',
          commentary: 'sfsd',
          suppliernoteSet: [],
          suppliersmetaSet: []
        }
      }
    ]
  }
};

const secondProps = {
  handleClickSearch: jest.fn(),
  isSearchActive: true,
  handleHideSearch: jest.fn(),
  handleTextChange: jest.fn(),
  numSelected: 1,
  selectedRow: [{
    name: 'product',
    sku: 123
  }],
  deselect: jest.fn(),
  selected: [1, 2, 3],
  deleteProduct: jest.fn(() => Promise.reject(new Error('Server error'))),
  assignSupplier: jest.fn(() => Promise.reject(new Error('Server error'))),
  client: {
    readQuery: jest.fn(),
    writeQuery: jest.fn()
  }
};

const state = {
  orderComponent: false,
  showComponent: true
};

describe('Test Table Header Component - Positive Case', () => {
  let wrapper;
  beforeEach(() => {
    wrapper.setState({
      ...state
    });
  });

  wrapper = shallow(
    <CustomToolBar {...firstProps} />
  );

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should handle change', () => {
    const event = {
      target: {
        name: 'supplier',
        value: 'halifax'
      }
    };

    const client = {
      query: jest.fn(() => Promise.resolve({
        data: {
          filterSuppliers: {
            edges: [
              {
                node: {
                  id: '1',
                  rating: 1,
                  tier: {
                    name: 'one'
                  },
                  isApproved: true,
                  name: 'first',
                  commentary: 'sfsd',
                  suppliernoteSet: [],
                  suppliersmetaSet: []
                }
              },
              {
                node: {
                  id: '2',
                  rating: 3,
                  tier: {
                    name: 'one'
                  },
                  isApproved: true,
                  name: 'first',
                  commentary: 'sfsd',
                  suppliernoteSet: [],
                  suppliersmetaSet: []
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

  it('should delete a product', () => {
    const spyDelete = jest.spyOn(wrapper.instance(), 'handleDelete');

    wrapper.instance().handleDelete();

    expect(spyDelete).toHaveBeenCalled();
  });

  it('should assign a supplier', () => {
    const supplier = { id: 1, displayName: 'halifax' };
    const spyAssignSupplier = jest.spyOn(wrapper.instance(), 'handleAssignSupplier');

    wrapper.instance().handleAssignSupplier(supplier);
    wrapper.instance().popperClickAway();

    expect(spyAssignSupplier).toHaveBeenCalledWith(supplier);
    expect(wrapper.state().openPopper).toBe(false);
  });
});

describe('Test Table Header Component - Negative Case', () => {
  let wrapper;
  beforeEach(() => {
    wrapper.setState({
      ...state
    });
  });

  wrapper = shallow(<CustomToolBar {...secondProps} />);

  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should handle change', () => {
    const event = {
      target: {
        name: 'supplier',
        value: 'halifax'
      }
    };

    const client = {
      query: jest.fn(() => Promise.reject())
    };

    const spyHandleChange = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().handleChange(event, client);

    expect(spyHandleChange).toHaveBeenCalledWith(event, client);
  });

  it('should not delete a product', () => {
    const spyDelete = jest.spyOn(wrapper.instance(), 'handleDelete');

    wrapper.instance().handleDelete();

    expect(spyDelete).toHaveBeenCalled();
  });

  it('should not assign a supplier', () => {
    const supplier = { id: 1, displayName: 'halifax' };
    const spyAssignSupplier = jest.spyOn(wrapper.instance(), 'handleAssignSupplier');

    wrapper.instance().handleAssignSupplier(supplier);

    expect(spyAssignSupplier).toHaveBeenCalledWith(supplier);
  });
});
