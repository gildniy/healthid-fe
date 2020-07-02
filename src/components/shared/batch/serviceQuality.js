import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, withStyles, IconButton
} from '@material-ui/core';
import {
  VeryUnsatisfied, Neutral, Unsatisfied, Satisfied, VerySatisfied
} from '../../../assets/images/stock/StockIcons';
import { stockFormStyles } from '../../../assets/styles/stock/addStockStyles';

const ServiceQuality = ({
  styles, classes, handleServiceButtons, serviceQuality
}) => {
  const inactiveValues = {
    fill: 'none',
    stroke: '#A3A3A3',
    lineFill: '#A3A3A3',
    opacity: '0.5'
  };
  const activeValues = {
    fill: '#FAF33E',
    stroke: 'none',
    lineFill: '#727272',
    opacity: '0.8'
  };
  const initialState = {
    veryUnsatisfied: inactiveValues,
    unsatisfied: inactiveValues,
    neutral: inactiveValues,
    satisfied: inactiveValues,
    verySatisfied: inactiveValues,
  };

  const keys = Object.keys(initialState);
  const selected = keys[serviceQuality - 1];

  if (serviceQuality !== '') {
    initialState[selected] = activeValues;
  }

  const [state, setState] = useState(initialState);

  const iconClick = (event, id) => {
    const { name } = event.currentTarget;
    setState({
      ...initialState,
      [selected]: inactiveValues,
      [name]: activeValues
    });
    handleServiceButtons(id);
  };

  const RenderIconButton = ({ name, id, children }) => (
    <IconButton
      name={name}
      disableRipple
      className={classes.iconButton}
      onClick={event => iconClick(event, id)}
    >
      {children}
    </IconButton>
  );

  RenderIconButton.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    children: PropTypes.objectOf(Object).isRequired,
  };

  return (
    <Grid container spacing={4} style={styles.gridContainer}>
      <Grid item container xs={2} align="centre" justify="center" direction="column">
        <Typography variant="subtitle1">Service Quality:</Typography>
      </Grid>
      <Grid item xs={10}>
        <RenderIconButton name="veryUnsatisfied" id={1}>
          <VeryUnsatisfied style={{ fontSize: '5rem' }} {...state.veryUnsatisfied} />
        </RenderIconButton>
        <RenderIconButton name="unsatisfied" id={2}>
          <Unsatisfied style={{ fontSize: '3.5rem' }} {...state.unsatisfied} />
        </RenderIconButton>
        <RenderIconButton name="neutral" id={3}>
          <Neutral style={{ fontSize: '3.5rem' }} {...state.neutral} />
        </RenderIconButton>
        <RenderIconButton name="satisfied" id={4}>
          <Satisfied style={{ fontSize: '3.5rem' }} {...state.satisfied} />
        </RenderIconButton>
        <RenderIconButton name="verySatisfied" id={5}>
          <VerySatisfied style={{ fontSize: '4rem' }} {...state.verySatisfied} />
        </RenderIconButton>
      </Grid>
    </Grid>
  );
};

ServiceQuality.propTypes = {
  classes: PropTypes.objectOf(Object),
  styles: PropTypes.objectOf(Object),
  handleServiceButtons: PropTypes.func,
  serviceQuality: PropTypes.number.isRequired
};

ServiceQuality.defaultProps = {
  classes: {},
  styles: {},
  handleServiceButtons: () => {}
};

export default withStyles(stockFormStyles)(ServiceQuality);
