import reportsActionTypes from './reportsTypes';

const reportsReducer = (reports, action) => {
  switch (action.type) {
    case reportsActionTypes.SET_REPORTS_STATE:
      return {
        ...reports,
        ...action.payload
      }
    default:
      return reports;
  }
};

export default reportsReducer;