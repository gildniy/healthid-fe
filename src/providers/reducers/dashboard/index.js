import DashboardActionTypes from './dashboardTypes';
import { setSaleData, setProductData } from './dashboardUtils';

const dashboardReducer = (dashboard, action) => {
  switch (action.type) {
  case DashboardActionTypes.SET_DATA:
    return {
      ...dashboard,
      ...action.payload
    };
  case DashboardActionTypes.SET_INITIAL_DATA:
    return {
      ...dashboard,
      saleChartData: setSaleData(dashboard.saleChartData, action.payload),
      productChartData: setProductData(dashboard.productChartData, action.payload)
    };
  default:
    return dashboard;
  }
};

export default dashboardReducer;
