import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, FormControlLabel, RadioGroup, Radio
} from '@material-ui/core';

const DeliveryPrompt = ({
  styles, handleChange, deliveryPromptness, editable
}) => (
  <Grid container spacing={4} style={styles.gridContainer}>
    <Grid item container xs={3} align="centre" justify="center" direction="column">
      <Typography variant="subtitle1">Deliver Promptness:</Typography>
    </Grid>
    <Grid item xs={9}>
      {editable
        ? (
          <RadioGroup
            row
            name="deliveryPromptness"
            value={deliveryPromptness}
            onChange={handleChange}
            style={styles.autofillStyles}
          >
            <FormControlLabel
              style={{ display: 'inline-flex', marginRight: '50px', padding: '0px' }}
              value="On Time"
              control={<Radio />}
              label={(
                <span>
                  On Time
                </span>
              )}
            />
            <FormControlLabel
              style={{ display: 'inline-flex', margin: '0px', padding: '0px' }}
              value="Late"
              control={<Radio />}
              label={(
                <span>
                  Late
                </span>
              )}
            />
          </RadioGroup>
        ) : (
          <Typography variant="subtitle1">
            {deliveryPromptness}
          </Typography>
        )}

    </Grid>
  </Grid>
);

DeliveryPrompt.propTypes = {
  styles: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  deliveryPromptness: PropTypes.string,
  editable: PropTypes.bool
};

DeliveryPrompt.defaultProps = {
  styles: {},
  deliveryPromptness: '',
  editable: true
};

export default DeliveryPrompt;
