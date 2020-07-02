import React from 'react';
import { shallow } from 'enzyme';
import { StateContext } from '../../../providers/stateProvider';
import * as AppContext from '../../../providers/stateProvider';
import {ProductsAndCustomers} from '../../../components/dashboard/productsAndCustomers';

const props = {
  classes: { },
  data: {
    salePerformances: {
      edges: [
        { node: { quantitySold: 5 } },
        { node: { quantitySold: 15 } },
      ]
  }}
};
const dashboard = {
  productChartData: { series: [], options: [] }
}
const context = [{ dashboard }, jest.fn()];

jest.spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => context);

describe('StoreSalesPerformance ', () => {
  let wrapper;
  let useEffect;
  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
    wrapper = shallow(<ProductsAndCustomers {...props} />);
  });

  it('renders without error', () => {
    const title = wrapper.find('WithStyles(ForwardRef(Typography))').at(0).text()
    expect(title).toBe('Volume of Products Sold')
  });
});
