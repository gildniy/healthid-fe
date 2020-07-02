import React from 'react';
import { shallow, mount, render } from 'enzyme';
import  {BatchInformation}  from '../../../../components/stock_control/batch/batchInformation';

const props = {
    renderTextField: jest.fn(),
    batchDetails: {
        dateReceived: '12/12/2010',
        user: {
            firstName: 'Buni',
            lastName: 'Adewunmi'
        }
    },
    classes: {}
}
describe(' BatchInformation ', () =>{
    it('Mounts the BatchInformation Page', () => {
        const wrapper = shallow(<BatchInformation {...props} />)
        expect(wrapper).toHaveLength(1);
    })
})
