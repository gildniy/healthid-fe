import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import withAuth from '../withAuth';
import { ProductsStyles } from '../../assets/styles/products/products';
import Products from './productsTable';
import ProductNavBar from './shared/reportNavBar';

import { useStateValue } from '../../providers/stateProvider';

export const ReportPage = ({ session }) => {
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid6'
    });
  }, []);

  return (
    <div style={ProductsStyles.div}>
      <ProductNavBar activeGrid="grid1" />
      <div>hi there</div>
      {/* <Products session={session} /> */}
    </div>
  );
};

ReportPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
};

ReportPage.defaultProps = {
  session: { me: {} },
};

export default withAuth(withStyles(ProductsStyles)(withRouter(ReportPage)));
