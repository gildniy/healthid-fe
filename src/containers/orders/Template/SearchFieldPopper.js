import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Popper, Fade, ClickAwayListener,
  List, ListItem, ListItemText
} from '@material-ui/core';

export const SearchFieldPopper = ({
  openPopper,
  anchorEl,
  active,
  filteredProducts,
  filteredSuppliers,
  placement,
  styles,
  addProductToList,
  popperClickAway,
  handleAssignSupplier
}) => (
  <Popper
    style={active === 'productName' ? styles.productPopper : styles.supplierPopper}
    open={openPopper}
    anchorEl={anchorEl}
    placement={placement}
    transition
  >
    {({ TransitionProps }) => (
      <ClickAwayListener onClickAway={popperClickAway}>
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={2}
            style={styles.rootPaper}
          >
            <Grid container>
              <Grid item xs={12} style={styles.zeroBottomPadding}>
                <List style={styles.listedCustomers}>
                  {active === 'productName'
                    ? (filteredProducts.map(({ id, productName }) => (
                      <ListItem
                        key={id}
                        dense
                        button
                        onClick={() => addProductToList({ id, productName })}
                      >
                        <ListItemText primary={productName} style={styles.product} />
                      </ListItem>
                    ))) : (filteredSuppliers.map(({ id, suppliersmetaSet }) => {
                      const { displayName } = suppliersmetaSet[0];
                      return (
                        <ListItem
                          key={id}
                          dense
                          button
                          onClick={() => handleAssignSupplier({ id, displayName })}
                        >
                          <ListItemText primary={displayName} />
                        </ListItem>
                      );
                    }))
                  }
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </ClickAwayListener>
    )}
  </Popper>
);

SearchFieldPopper.propTypes = {
  openPopper: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  filteredProducts: PropTypes.arrayOf(Object).isRequired,
  filteredSuppliers: PropTypes.arrayOf(Object).isRequired,
  placement: PropTypes.string.isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  addProductToList: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  handleAssignSupplier: PropTypes.func.isRequired,
};

export default SearchFieldPopper;
