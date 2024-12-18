import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SupplierDescription from '../../../../components/suppliers/Templates/SupplierDescription';

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
    supplierMeta: [],
    supplierContacts: [],
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
    notes: [
      {
        id: 1,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 2,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 3,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 4,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 5,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 6,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 7,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 8,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 9,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 10,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      },
      {
        id: 11,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      }
    ]
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

describe('SupplierDescription', () => {
  it('should render the SupplierDescription component properly', () => {
    const setupSupplierDescription = () => {
      const wrapper = shallow(<SupplierDescription {...props} />);
      return wrapper;
    };

    let wrapper;
    wrapper = setupSupplierDescription();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
