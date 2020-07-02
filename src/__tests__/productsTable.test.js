import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import { GET_APPROVED_PRODUCTS } from '../queries/productsQueries/productQueries';
import { Products } from '../components/products/productsTable';
import { getProducts, getSortedData } from '../components/products/filter';
import { ProductCard } from '../components/products/shared/ProductCard';
const props = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  handleHideSearch: jest.fn(),
  handleClickSearch: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon'
  },
  match: {
    params: {
      status: 'approved'
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      }
    }
  }
};
const props2 = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon',
  },
  match: {
    params: {
      status: 'proposed'
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  },
};
const props3 = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon',
  },
  match: {
    params: {
      status: 'all'
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  },
};
const props4 = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon',
  },
  match: {
    params: {
      status: 'rfrf'
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  },
};
const props5 = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon',
  },
  match: {
    params: {
      status: 'proposed-edits'
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  },
};
const mocks = [
  {
    "request": {
      "query": GET_APPROVED_PRODUCTS,
      "variables": {
        "pageCount": 10,
        "pageNumber": 1
      }
    },
    result: {
      data: {
        approvedProducts: [
          {
            id: '261',
            productName: 'Panadol',
            skuNumber: '000261',
            description: 'Nice meds, they mess you real good',
            brand: 'Stans',
            manufacturer: 'Stans',
            vatStatus: false,
            quantityInStock: 85,
            salesPrice: 408.0,
            nearestExpiryDate: '2019-08-13',
            loyaltyWeight: 5,
            tags: [],
            productCategory: {
              id: '15',
              name: 'pain killer'
            },
            dispensingSize: {
              id: '1',
              name: 'tablets'
            },
            preferredSupplier: {
              id: '2',
              name: 'sean2',
              suppliersmetaSet:[
                { displayName: 'example' }
              ]
            },
            backupSupplier: {
              id: '2',
              name: 'sean2',
              suppliersmetaSet:[
                {displayName:'example'}
              ]
            }
          }
        ],
        proposedProducts: [
          {
            id: '297',
            productName: 'Geisha',
            skuNumber: '000297',
            description: 'African magic is cool',
            brand: 'Dope',
            manufacturer: 'Africa',
            vatStatus: false,
            quantityInStock: 0,
            salesPrice: 0.0,
            nearestExpiryDate: null,
            loyaltyWeight: 0,
            tags: [],
            productCategory: {
              id: '16',
              name: 'cosmetic'
            },
            dispensingSize: {
              id: '3',
              name: 'bottles'
            },
            preferredSupplier: {
              id: 'bu5ixuq72',
              name: 'Unilever'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ],
        proposedEdits: [
          {
            id: '297',
            productName: 'Geisha',
            skuNumber: '000297',
            description: 'African magic is cool',
            brand: 'Dope',
            manufacturer: 'Africa',
            vatStatus: false,
            quantityInStock: 0,
            salesPrice: 0.0,
            nearestExpiryDate: null,
            loyaltyWeight: 0,
            tags: [],
            productCategory: {
              id: '16',
              name: 'cosmetic'
            },
            dispensingSize: {
              id: '3',
              name: 'bottles'
            },
            preferredSupplier: {
              id: 'bu5ixuq72',
              name: 'Unilever'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ],
        "products": [
          {
            "id": "297",
            "productName": "Geisha",
            "skuNumber": "000297",
            "description": "African magic is cool",
            "brand": "Dope",
            "manufacturer": "Africa",
            "vatStatus": false,
            "quantityInStock": 0,
            "salesPrice": 0.0,
            "nearestExpiryDate": null,
            "loyaltyWeight": 0,
            "tags": [],
            "productCategory": {
              "id": "16",
              "name": "cosmetic"
            },
            "dispensingSize": {
              "id": "3",
              "name": "bottles"
            },
            "preferredSupplier": {
              "id": "bu5ixuq72",
              "name": "Unilever"
            },
            "backupSupplier": {
              "id": "2",
              "name": "sean2"
            }
          }
        ]
      }
    }
  },
  {
    "request": {
      "query": GET_APPROVED_PRODUCTS,
      "variables": {
        "pageCount": 10,
        "pageNumber": 1
      }
    },
    result: {
      data: {
        approvedProducts: [
          {
            id: '261',
            productName: 'Panadol',
            skuNumber: '000261',
            description: 'Nice meds, they mess you real good',
            brand: 'Stans',
            manufacturer: 'Stans',
            vatStatus: false,
            quantityInStock: 85,
            salesPrice: 408.0,
            nearestExpiryDate: '2019-08-13',
            loyaltyWeight: 5,
            tags: [],
          }
        ],
        proposedProducts: [
          {
            id: '297',
            productName: 'Geisha',
            skuNumber: '000297',
            description: 'African magic is cool',
            brand: 'Dope',
            manufacturer: 'Africa',
            vatStatus: false,
            quantityInStock: 0,
            salesPrice: 0.0,
            nearestExpiryDate: null,
            loyaltyWeight: 0,
            tags: [],
            productCategory: {
              id: '16',
              name: 'cosmetic'
            },
            dispensingSize: {
              id: '3',
              name: 'bottles'
            },
            preferredSupplier: {
              id: 'bu5ixuq72',
              name: 'Unilever'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ],
        proposedEdits: [
          {
            id: '297',
            productName: 'Geisha',
            skuNumber: '000297',
            description: 'African magic is cool',
            brand: 'Dope',
            manufacturer: 'Africa',
            vatStatus: false,
            quantityInStock: 0,
            salesPrice: 0.0,
            nearestExpiryDate: null,
            loyaltyWeight: 0,
            tags: [],
            productCategory: {
              id: '16',
              name: 'cosmetic'
            },
            dispensingSize: {
              id: '3',
              name: 'bottles'
            },
            preferredSupplier: {
              id: 'bu5ixuq72',
              name: 'Unilever'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ],
        "products": [
          {
            "id": "297",
            "productName": "Geisha",
            "skuNumber": "000297",
            "description": "African magic is cool",
            "brand": "Dope",
            "manufacturer": "Africa",
            "vatStatus": false,
            "quantityInStock": 0,
            "salesPrice": 0.0,
            "nearestExpiryDate": null,
            "loyaltyWeight": 0,
            "tags": [],
            "productCategory": {
              "id": "16",
              "name": "cosmetic"
            },
            "dispensingSize": {
              "id": "3",
              "name": "bottles"
            },
            "preferredSupplier": {
              "id": "bu5ixuq72",
              "name": "Unilever"
            },
            "backupSupplier": {
              "id": "2",
              "name": "sean2"
            }
          }
        ]
      }
    }
  }
];

describe('Test table rendering and data functions', () => {
  let wrapper;
  let wrapperInstance;
  beforeEach(() => {
    wrapper = shallow(<Router><MockedProvider mocks={mocks} addTypename={false} ><Products {...props} /></MockedProvider></Router>);
  })

  it('should renders with loader ', () => {
    expect(wrapper.find('Products').length).toBe(1);
  });
  it('should initialize all functions', () => {
    const wrapperInstance = shallow(<Products {...props} />);
    shallow(<Products {...props3} />);
    shallow(<Products {...props4} />);
    wrapperInstance.instance().handleViewProposed({ approved: true, proposed: true });
    wrapperInstance.instance().handleViewProposed({ approved: false, proposed: true });
    wrapperInstance.instance().handleViewProposed({ approved: true, proposed: false });
    wrapperInstance.instance().handleViewProposed({ approved: false, proposed: false });
  });

  it('should handle search', async () => {
    const wrapperInstance = shallow(<Products {...props} />);
    const client = {
      query: () => { }
    }
    wrapperInstance.instance().handleSearch({ target: { value: 'ddd' } }, client);
    wrapperInstance.instance().handleSearch({ target: { value: undefined } }, client);
    wrapperInstance.instance().handleSearch({ target: { value: '' } }, client);
  });

  it('should handle pagination', async () => {
    const wrapperInstance = shallow(<Products {...props} />);
    const wrapperInstance1 = shallow(<Products {...props2} />);
    const wrapperInstance2 = shallow(<Products {...props5} />);

    wrapperInstance.instance().handleChangeRowsPerPage({ target: { value: 'ddd' } });
    wrapperInstance.instance().handleChangePage(1);
    wrapperInstance.instance().handleOnRowClick('eded');
    wrapperInstance1.instance().handleOnRowClick('ede');
    wrapperInstance2.instance().handleOnRowClick('ede');
  });
  it('should handle filter', async () => {
    expect(typeof getProducts(mocks[0].result.data, 'approved')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, 'proposed')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, 'proposed-edits')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, 'all')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, 'dfdf')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, 'search')).toBe('object');
    expect(typeof getProducts({ products: undefined }, 'search')).toBe('object');
    expect(typeof getProducts(undefined, 'approved')).toBe('object');
    expect(typeof getProducts(mocks[0].result.data, undefined)).toBe('object');
    expect(typeof getSortedData(getProducts(mocks[0].result.data, 'asc', 'name'))).toBe('object');
  });
  it('should handle filter', async () => {
    expect(typeof getProducts(mocks[1].result.data, 'approved')).toBe('object');
    expect(typeof getProducts(mocks[1].result.data, 'proposed')).toBe('object');
    expect(typeof getProducts(mocks[1].result.data, 'proposed-edits')).toBe('object');
    expect(typeof getProducts(mocks[1].result.data, 'all')).toBe('object');
    expect(typeof getProducts(mocks[1].result.data, 'dfdf')).toBe('object');
    expect(typeof getProducts(mocks[1].result.data, 'search')).toBe('object');
    
  });
});

describe('Test toolBar actions', () => {
  const prop = {
    classes: {
      iconButton: 'icon-button',
      popper: 'popper',
      paper: 'paper',
      exportSVG: 'export'
    },
    handleViewProposed: jest.fn()
  };
});
