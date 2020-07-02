import React from 'react';
import { shallow } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import {StoreSalesPerformance} from '../../../components/dashboard/storeSalesPerformance';

const props = {
  classes: { },
  data: {
    salePerformances: {
      edges: [
        { node: { subtotal: 100 } },
        { node: { subtotal: 200 } },
      ]
  }},
  currency: 'UShs',
  active: '',
  range: '',
  handleDateButtons: jest.fn(),
  handleIconDateRange: jest.fn()
};
const dashboard = {
  saleChartData: { series: [], options: [] }
}
const context = [{ dashboard }, jest.fn()];

jest.spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => context);

describe('StoreSalesPerformance ', () => {
  let wrapper;
  let useEffect;
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
    wrapper = shallow(<StoreSalesPerformance {...props} />);
  });

  it('renders without error', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Paper))')).toHaveLength(2)
  });
});
