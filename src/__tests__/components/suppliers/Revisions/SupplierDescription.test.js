import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SupplierDescription from '../../../../components/suppliers/Revisions/SupplierDescription';

const props = {
  supplier: {
    isApproved: false,
    id: 'AlphaX',
    address: '​​​​​NNPC Towers, Central Business District, Abuja.',
    name: 'Damian Inc',
    mobile: '08137519698',
    rating: '5',
    image:
      'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
    email: 'test@gmail.com',
    tier: 'Manufacturer',
    paymentTerms: 'Daily',
    supplierratingSet: [],
    supplierMeta: [{
      logo: 'x'
    }],
    creditDays: '3 days',
    supplierContacts: [
      {
        addressLin1: '144 Peter Road',
        addressLine2: 'JanBleck 20',
        city: {
          name: 'Kampala'
        },
        country: {
          name: 'Uganda'
        }
      },
    ],
  },
  currentSupplier: {
    isApproved: true,
    id: 'AlphaX',
    address: '​​​​​NNPC Towers, Central Business District, Abuja.',
    name: 'Damian Inc',
    mobile: '08137519698',
    rating: '5',
    image:
      'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
    email: 'test@gmail.com',
    tier: 'Manufacturer',
    paymentTerms: 'Daily',
    supplierratingSet: [{
      rating: 5
    }],
    supplierMeta: [{
      logo: 'x'
    }],
    creditDays: '3 days',
    supplierContacts: [
      {
        addressLin1: '144 Peter Road',
        addressLine2: 'JanBleck 20',
        city: {
          name: 'Kampala'
        },
        country: {
          name: 'Uganda'
        }
      },
    ],
  },
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

describe('SupplierDescription', () => {
  it('should render the SupplierDescription component properly', () => {
    const setupSupplierDescription = () => {
      const wrapper = shallow(<SupplierDescription {...props} />);
      return wrapper;
    };

    const wrapper = setupSupplierDescription();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
