import React from 'react';
import { shallow } from 'enzyme';
import { OutOfstockBatch } from '../../../components/sell/outOfstockBatch';

describe('OutOfstockBatch', () => {
  const props = {
    selectedProduct: {
      productName: 'Aboniki',
      productCategory: 'Beauty',
      batchInfo: [{
        id: 1,
        batchNo: 'OUT OF STOCK',
        expiryDate: '2019-4-12',
        batchQuantities: [
          { quantityRemaining: 2 }
        ],
      }]
    },
    batchesForCart: [{
      batchId: 1,
      expiryDate: '2019-4-12',
      quantity: 99,
    }],
    handleSelectedCheckBox: jest.fn(),
    handleBatchInputChange: jest.fn(),
    isBatchSelected: jest.fn().mockReturnValue(true)
  };
  const wrapper = shallow(<OutOfstockBatch {...props} />);

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
    expect(wrapper.find('NumericInput').props().value).toBe(99);
  });
  it('hides NumericInput when isBatchSelected is false', () => {
    wrapper.setProps({ isBatchSelected: jest.fn().mockReturnValue(false) });
    expect(wrapper.find('NumericInput').exists).toBeFalsy;
  });
});
