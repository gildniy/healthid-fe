import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import productCardStyles from '../../assets/css/productCardStyles';
import currencyFormatter from '../payment/utils/formatter';

const ProductCard = ({
  classes,
  product,
  currency,
  handleClickViewDetails,
}) => {
  const {
    productName,
    image,
    salesPrice,
    productCategory: { name: categoryName },
  } = product;
  const dispensingSize = product.dispensingSize.name !== 'NULL'
    ? product.dispensingSize.name
    : 'no Dispensing size';

  const productUPC = product.globalUpc || 'No UPC';

  return (
    <Paper
      elevation={2}
      className={classes.paper}
      square
      onClick={() => handleClickViewDetails(product)}
    >
      <Grid container>
        <Grid item container xs={12} direction="column">
          <Grid item>
            <Typography className={classes.productName}>
              {productName}
            </Typography>
            <Typography variant="caption" className={classes.productUpc}>
              {` [${productUPC}]`}
            </Typography>
          </Grid>
          <Typography variant="caption" className={classes.dispensingSize}>
            {dispensingSize}
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={8} className={classes.categoryGrid}>
            <Typography className={classes.productCategory}>
              {categoryName.toLowerCase()}
            </Typography>
          </Grid>
          <Grid container item xs={4} justify="flex-end" className={classes.mediaGrid}>
            <img src={image} className={classes.media} alt="media" />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.productPrice}>
            {`${currency} ${currencyFormatter(salesPrice)}`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  handleClickViewDetails: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object)
};

ProductCard.defaultProps = {
  classes: {}
};

export default withStyles(productCardStyles)(ProductCard);
