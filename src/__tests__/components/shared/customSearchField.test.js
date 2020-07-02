import React from 'react';
import { mount, shallow } from 'enzyme';
import CustomSearchField from '../../../components/shared/customSearchField';
import SearchFieldPopper from '../../../components/shared/searchFieldPopper';

describe('Search Field', () => {
  const props = {
    state: {
      openPopper: jest.fn(),
      active: 'productName',
      filteredProducts: [
        {
          id: '1',
          productName: 'Cool 2'
        },
        {
          id: '2',
          productName: 'Cool 3'
        }
      ],
      filteredSuppliers: [
        {
          id: '213312',
          suppliersmetaSet: [
            {
              displayName: 'Supplier 1'
            },
            {
              displayName: 'Supplier 2'
            }
          ]
        }
      ],
    },
    placement: {},
    styles: {},
    displaySelected: jest.fn(),
    popperClickAway: jest.fn()
  };
  it('Tests the SeachField Poper Componenet', () => {
    const tree = shallow(<SearchFieldPopper {...props} />);
    expect(tree).toHaveLength(1);
  });
});
