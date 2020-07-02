import React from 'react';
import { mount } from 'enzyme';
import {
  TableRow
} from '@material-ui/core';
import TableContent from '../../../../components/sell/salesHistory/tableContent';

const ref = React.createRef();
const props = {
  classes: { table: '' },
  columns: [{ id: 1, label: '' }],
  data: [
    {
      id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: ''
    },
    {
      id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: ''
    },
    {
      id: '', dateSold: '', timeSold: '', location: '', soldBy: '', receiptId: '', soldTo: ''
    }
  ],
  page: 1,
  rowsPerPage: 1,
  handleOnRowClick: jest.fn(),
};
describe('TableContent component', () => {
  const wrapper = mount(<TableContent {...props} ref={ref} />);
  it('renders TableContent component', () => {
    const table = wrapper.find('ForwardRef(Table)').length;
    expect(table).toBe(1);
  });

  it('calls "handleChange" function', () => {
    const wrapper = mount(<TableContent {...props} ref={ref} />);
    wrapper.find('ForwardRef(TableRow)').last().props().onClick();
    expect(props.handleOnRowClick).toHaveBeenCalled();
  });
});
