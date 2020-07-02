import React from 'react';
import { shallow } from 'enzyme';
import { FieldTitle, getFields } from '../../../../components/suppliers/Revisions/SupplierFields';

const currentContacts = {
  addressLine1: '144 Peter Road',
  addressLine2: 'JanBleck 20',
  city: {
    name: 'Kampala'
  },
  country: {
    name: 'Uganda'
  }
};
const contacts = {
  addressLine1: '144 Peter Road',
  addressLine2: 'JanBleck 21',
  city: {
    name: 'Kigali'
  },
  country: {
    name: 'Rwanda'
  }
};

describe('SupplierInformation', () => {
  it('should run the getFields function', () => {
    const FieldValues = getFields(currentContacts, contacts, {});
    const wrapper1 = shallow(<FieldValues.Render name="addressLine1" />);
    const wrapper2 = shallow(<FieldValues.Render name="city_country" />);
    expect(wrapper1.length).toBe(1);
    expect(wrapper2.length).toBe(2);
  });

  it('should render the FieldTitle component', () => {
    const wrapper1 = shallow(<FieldTitle changed title="Email" classes={{}} />);
    // It has two children, both the icon and the text since it has changed
    expect(wrapper1.props().children.length).toEqual(2);

    const wrapper2 = shallow(<FieldTitle title="Email" classes={{}} />);
    expect(wrapper2.props().children[0]).toEqual('');
  });
});
