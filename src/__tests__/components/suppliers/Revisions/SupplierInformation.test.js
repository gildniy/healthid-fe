import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SupplierInformation from '../../../../components/suppliers/Revisions/SupplierInformation';

const props = {
  supplier: {
    tier: {
      name: 'Manufacturer'
    },
    supplierMeta: [{
      paymentTerms: 'ON_CREDIT',
      creditDays: 10
    }],
  },
  currentSupplier: {
    isApproved: true,
    tier: {
      name: 'Manufacturer'
    },
    suppliersmetaSet: [{
      paymentTerms: 'ON_CREDIT',
      creditDays: 10
    }],
  },
  renderTextField: jest.fn(),
  variables: {},
  classes: {},
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

describe('SupplierInformation', () => {
  it('should render the SupplierInformation component properly', () => {
    const setupSupplierInformation = () => {
      const wrapper = shallow(<SupplierInformation {...props} />);
      return wrapper;
    };

    const wrapper = setupSupplierInformation();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
