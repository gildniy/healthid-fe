import React from 'react';
import {
  Tooltip, Typography, IconButton, Grid, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { toolbarButton } from '../../../assets/styles/salesHistory/salesHistoryStyles';
import Icon from '../../products/productIcons';
import { CalenderIcon, SearchIcon, ResetIcon } from '../../../assets/SvgIcons/sellScreenSvgs';

export const Toolbar = ({
  classes,
  title,
  handleResetSales,
  searchPopperToggle,
  handleSavePrintOpen,
  handleToggle,
}) => (
  <Grid container className={classes.toolbarWrapper}>
    <Grid item xs={6} container justify="flex-start">
      <Grid item container xs={12}>
        <Typography variant="subtitle1" className={classes.typo}>
          {title}
        </Typography>
        <Button
          style={toolbarButton.resetButton}
          size="small"
          onClick={handleResetSales}
        >
          <ResetIcon style={toolbarButton.resetIcon} />
          <Typography variant="subtitle1" style={toolbarButton.buttonsTypo}>
            Reset
          </Typography>
        </Button>
      </Grid>
    </Grid>
    <Grid
      item
      xs={6}
      container
      justify="flex-end"
      className={classes.iconsWrapper}
    >
      <Tooltip title="search">
        <IconButton onClick={searchPopperToggle}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Custom Filter">
        <IconButton
          className={classes.iconButton}
          onClick={handleToggle}
        >
          <CalenderIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export List">
        <IconButton onClick={handleSavePrintOpen}>
          <Icon
            id="export"
            className={classes.exportSVG}
          />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
);

Toolbar.propTypes = {
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  searchPopperToggle: PropTypes.func.isRequired,
  handleSavePrintOpen: PropTypes.func.isRequired,
  handleResetSales: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
  classes: {},
  title: '',
};

export default Toolbar;
