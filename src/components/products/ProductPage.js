import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import withAuth from '../withAuth';
import { ProductsStyles } from '../../assets/styles/products/products';
import Products from './productsTable';
import ReportNavbar from './shared/productNavBar';

import { useStateValue } from '../../providers/stateProvider';

export const ProductPage = ({ session }) => {
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }, []);

  return (
    <div style={ProductsStyles.div}>
      <ReportNavbar activeGrid="grid1" />
      <Products session={session} />
    </div>
  );
};

ProductPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
};

ProductPage.defaultProps = {
  session: { me: {} },
};

export default withAuth(withStyles(ProductsStyles)(withRouter(ProductPage)));
