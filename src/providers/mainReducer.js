import gridReducer from './reducers/grid';
import customersReducer from './reducers/customers';
import countriesReducer from './reducers/countries';
import savePrintReducer from './reducers/savePrint';
import stockReducer from './reducers/stock';
import pricingReducer from './reducers/pricingLoyalty';
import dashboardReducer from './reducers/dashboard';
import batchInformationReducer from './reducers/batch';
import sellReducer from './reducers/sell';
import saleHistoryReducer from './reducers/saleHistory';
import orderFormsReducer from './reducers/supplierOrderForms';
import reportsReducer from './reducers/reports';
import returnReducer from './reducers/returns';

const mainReducer = (state, action) => ({
  grid: gridReducer(state.grid, action),
  countries: countriesReducer(state.countries, action),
  customers: customersReducer(state.customers, action),
  savePrint: savePrintReducer(state.savePrint, action),
  stock: stockReducer(state.stock, action),
  sell: sellReducer(state.sell, action),
  returns: returnReducer(state.returns, action),
  saleHistory: saleHistoryReducer(state.saleHistory, action),
  pricing: pricingReducer(state.pricing, action),
  dashboard: dashboardReducer(state.dashboard, action),
  batchInformation: batchInformationReducer(state.batchInformation, action),
  orderForms: orderFormsReducer(state.orderForms, action),
  reports: reportsReducer(state.reports, action),
});

export default mainReducer;
