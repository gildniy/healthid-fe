import React from 'react';
import { shallow } from 'enzyme';
import { SaleBatchHeader } from '../../../components/sell/salesBatchHeader';

describe('SaleBatchHeader', () => {
  const props = {
    selectedProduct: {
      productName: 'Aboniki',
      productCategory:{ name: 'Beauty' }
    },
    batchesForCart: [{ id: 1 }],
    handleBatchDialogClose: jest.fn(),
    handleClickToAddProduct: jest.fn(),
  };
  const wrapper = shallow(<SaleBatchHeader {...props} />)

  it('renders all grids', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Grid))').length).toBe(4);
  });

  it('handles close IconButton onClick', () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).simulate('click')
    expect(props.handleBatchDialogClose).toHaveBeenCalled();
  })

  it('handles add IconButton onClick', () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(0).simulate('click')
    expect(props.handleClickToAddProduct).toHaveBeenCalled();
  })
});
