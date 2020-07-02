import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import viewProductsStyles from '../../assets/css/viewProductsStyles';
import SearchList from './searchList';
import ProductCard from './productCard';
import { useStateValue } from '../../providers/stateProvider';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';

const styles = viewProductsStyles;
export const SwitchComponentRendering = ({
  state: { searchValue, filteredProducts },
  approvedProducts
}) => {
  const [
    { sell: { currency } }, dispatch
  ] = Object.values(useStateValue());

  const productsWithQuantity = approvedProducts
    .filter(product => product.quantityInStock > 0);
  const preferredProducts = productsWithQuantity.slice(0, 6);

  const handleClickViewDetails = (product) => {
    dispatch({
      type: sellActionTypes.SET_SELECTED_PRODUCT,
      payload: product
    });
    dispatch({ type: sellActionTypes.TOGGLE_SALE_BATCH_DIALOG });
  };

  if (searchValue && filteredProducts) {
    return (
      <Grid item xs={12}>
        <Paper
          elevation={0}
          style={styles.filteredProductsPaper}
        >
          {filteredProducts.length
            ? filteredProducts.map(product => (
              <SearchList
                key={product.id}
                id={product.id}
                product={product}
                currency={currency}
                handleClickViewDetails={handleClickViewDetails}
              />
            )) : (
              <Typography variant="body1" style={styles.filteredProducts}>
                {`Unable to find products that match ${searchValue}`}
              </Typography>
            )
          }
        </Paper>
      </Grid>
    );
  }
  return (
    <>
      <Grid item xs={12} style={styles.frequentProducts}>
        <Typography
          variant="inherit"
          style={styles.frequentProducts1}
        >
          Frequently Bought Products
        </Typography>
      </Grid>
      <Grid container item spacing={3} xs={12} style={styles.renderProductCardGrid}>
        {preferredProducts.map(product => (
          <Grid item container key={product.productName} xs={4}>
            <ProductCard
              product={product}
              currency={currency}
              handleClickViewDetails={handleClickViewDetails}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

SwitchComponentRendering.propTypes = {
  state: PropTypes.instanceOf(Object),
  approvedProducts: PropTypes.instanceOf(Object),
};

SwitchComponentRendering.defaultProps = {
  state: {},
  approvedProducts: {},
};

export default SwitchComponentRendering;
