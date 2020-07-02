import React from 'react';
import { shallow } from 'enzyme';
import { SaleBatchList } from '../../../components/sell/salesBatchList';

describe('SaleBatchList', () => {
  const props = {
    selectedProduct: {
      productName: 'Aboniki',
      productCategory: 'Beauty',
      batchInfo: [{
        id: 1,
        batchNo: '77488743',
        expiryDate: '2019-4-12',
        batchQuantities: [
          { quantityRemaining: 2 }
        ],
      }]
    },
    batchesForCart: [{
      batchId: 1,
      batchNo: '77488743',
      expiryDate: '2019-4-12',
      quantity: 10,
    }],
    handleSelectedCheckBox: jest.fn(),
    handleBatchInputChange: jest.fn(),
    isBatchSelected: jest.fn().mockReturnValue(true)
  };
  const wrapper = shallow(<SaleBatchList {...props} />);

  it('handles checkbox selection', () => {
    wrapper.find('WithStyles(ForwardRef(Checkbox))').simulate('click');
    expect(props.handleSelectedCheckBox).toHaveBeenCalled();
  });
  it('handles change on NumericInput', () => {
    const event = 1;
    wrapper.find('NumericInput').props().onChange(event);
    expect(props.handleBatchInputChange).toHaveBeenCalled();
  });
  it('handles NumericInput format', () => {
    const event = 10;
    wrapper.find('NumericInput').props().format(event);
    expect(wrapper.find('NumericInput').props().value).toBe(10);
  });
  it('hides NumericInput when isBatchSelected is false', () => {
    wrapper.setProps({ isBatchSelected: jest.fn().mockReturnValue(false) });
    expect(wrapper.find('NumericInput').exists).toBeFalsy;
  });
});
