import customers from './reducers/customers/customersState';
import savePrint from './reducers/savePrint/savePrintState';
import stock from './reducers/stock/stockState';
import pricing from './reducers/pricingLoyalty/pricingState';
import dashboard from './reducers/dashboard/dashboardState';
import batchInformation from './reducers/batch/batchState';
import sell from './reducers/sell/sellState';
import returns from './reducers/returns/returnsState';
import saleHistory from './reducers/saleHistory/saleHistoryState';
import orderForms from './reducers/supplierOrderForms/orderFormsState';
import reports from './reducers/reports/reportsState';

const initialState = {
  grid: {
    isActive: 'grid2',
    isNavbarHidden: false
  },
  countries: [],
  customers,
  savePrint,
  stock,
  sell,
  returns,
  pricing,
  dashboard,
  batchInformation,
  saleHistory,
  orderForms,
  reports,
};

export default initialState;
