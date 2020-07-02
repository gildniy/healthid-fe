import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, withStyles, IconButton
} from '@material-ui/core';
import {
  VeryUnsatisfied, Neutral, Unsatisfied, Satisfied, VerySatisfied
} from '../../assets/images/stock/StockIcons';
import { stockFormStyles } from '../../assets/styles/stock/addStockStyles';

const ServiceQuality = ({
  styles, classes, handleServiceButtons, serviceQuality, editable
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
    opacity: '0.9'
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

  useEffect(() => {
    if (!editable) {
      initialState[selected] = activeValues;
      setState({
        ...initialState
      });
    }
  }, [editable]);

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

  const handleOptionDisplay = (id) => {
    switch (id) {
    case 1:
      return (
        <RenderIconButton name="veryUnsatisfied" id={id}>
          <VeryUnsatisfied
            style={{ fontSize: '5rem' }}
            {...state.veryUnsatisfied}
          />
        </RenderIconButton>
      );
    case 2:
      return (
        <RenderIconButton name="unsatisfied" id={id}>
          <Unsatisfied
            style={{ fontSize: '3.5rem' }}
            {...state.unsatisfied}
          />
        </RenderIconButton>
      );
    case 3:
      return (
        <RenderIconButton name="neutral" id={id}>
          <Neutral
            style={{ fontSize: '3.5rem' }}
            {...state.neutral}
          />
        </RenderIconButton>
      );
    case 4:
      return (
        <RenderIconButton name="satisfied" id={id}>
          <Satisfied
            style={{ fontSize: '3.5rem' }}
            {...state.satisfied}
          />
        </RenderIconButton>
      );
    case 5:
      return (
        <RenderIconButton name="verySatisfied" id={id}>
          <VerySatisfied
            style={{ fontSize: '4rem' }}
            {...state.verySatisfied}
          />
        </RenderIconButton>
      );
    default:
      return null;
    }
  };
  return (
    <Grid container spacing={4} style={styles.gridContainer}>
      <Grid item container xs={2} align="centre" justify="center" direction="column">
        <Typography variant="subtitle1" required>Service Quality:</Typography>
      </Grid>
      {editable
        ? (
          <Grid item xs={10}>
            {handleOptionDisplay(1)}
            {handleOptionDisplay(2)}
            {handleOptionDisplay(3)}
            {handleOptionDisplay(4)}
            {handleOptionDisplay(5)}
          </Grid>
        )
        : (
          <Grid item xs={10}>
            {handleOptionDisplay(serviceQuality)}
          </Grid>
        )}
    </Grid>
  );
};

ServiceQuality.propTypes = {
  classes: PropTypes.objectOf(Object),
  styles: PropTypes.objectOf(Object),
  // eslint-disable-next-line react/require-default-props
  handleServiceButtons: PropTypes.func,
  serviceQuality: PropTypes.number,
  editable: PropTypes.bool
};

ServiceQuality.defaultProps = {
  classes: {},
  styles: {},
  serviceQuality: 0,
  editable: true
};

export default withStyles(stockFormStyles)(ServiceQuality);
