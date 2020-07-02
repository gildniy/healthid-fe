import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Popper, Fade, ClickAwayListener,
  List, ListItem, ListItemText
} from '@material-ui/core';

export const SearchFieldPopper = ({
  state: {
    openPopper,
    anchorEl,
    active,
    filteredProducts,
    filteredSuppliers,
  },
  placement,
  styles,
  displaySelected,
  popperClickAway,
  large
}) => (
  <Popper
    style={styles.zIndex}
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
            style={large ? { ...styles.rootPaper, ...styles.widerRootPaper } : styles.rootPaper}
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
                        onClick={() => displaySelected(active, productName, id)}
                      >
                        <ListItemText primary={productName} />
                      </ListItem>
                    ))) : (filteredSuppliers.map(({ id, suppliersmetaSet, name }) => {
                      const nameToDisplay = suppliersmetaSet.length
                        ? suppliersmetaSet[0].displayName
                        : name;
                      return (
                        <ListItem
                          key={id}
                          dense
                          button
                          onClick={() => displaySelected(active, nameToDisplay, id)}
                        >
                          <ListItemText primary={nameToDisplay} />
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
  state: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
  placement: PropTypes.instanceOf(Object),
  displaySelected: PropTypes.func,
  popperClickAway: PropTypes.func,
  large: PropTypes.bool,
};

SearchFieldPopper.defaultProps = {
  state: {},
  styles: {},
  placement: 'bottom-start',
  displaySelected: () => {},
  popperClickAway: () => {},
  large: false
};

export default SearchFieldPopper;
