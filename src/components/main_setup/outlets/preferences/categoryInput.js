import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem, IconButton,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

export const CategoryInput = (props) => {
  const {
    handleChange,
    handleConfirmChanges,
    handleShowInput,
    stateData,
    classes
  } = props;
  const error = stateData.name.length < 1;

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.categoryRow}
    >
      <Grid item xs={2} className={classes.categoryNameCell}>
        <TextField
          error={error}
          type="text"
          value={stateData.name}
          onChange={handleChange('name')}
          margin="dense"
          variant="filled"
          helperText="Required"
        />
      </Grid>
      <Grid item xs={3} className={classes.categoryCell} align="center">
        <TextField
          type="number"
          value={stateData.salesMarkup}
          onChange={handleChange('salesMarkup')}
          margin="dense"
          variant="filled"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
      </Grid>
      <Grid item xs={3} className={classes.categoryCell} align="center">
        <TextField
          select
          value={stateData.isVat || false}
          onChange={handleChange('isVat')}
          margin="dense"
          variant="filled"
        >
          <MenuItem value>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={2} className={classes.categoryCell} align="center">
        <Grid item xs={12}>
          <TextField
            type="number"
            value={stateData.loyalty}
            onChange={handleChange('loyalty')}
            margin="dense"
            variant="filled"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
        </Grid>
      </Grid>
      <Grid item xs={2} className={classes.categoryCell} align="center">
        <Grid item xs={12}>
          <Tooltip title="Cancel" placement="bottom">
            <IconButton onClick={handleShowInput}>
              <Clear />
            </IconButton>
          </Tooltip>
          <Tooltip title="Done" placement="bottom">
            <IconButton onClick={handleConfirmChanges}>
              <Done />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

CategoryInput.defaultProps = {
  stateData: {
    name: '',
    salesMarkup: 0,
    isVat: false,
    loyalty: 0,
  },
  classes: {
    categoryRow: '',
    categoryCell: '',
    categoryNameCell: ''
  }
};

CategoryInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleConfirmChanges: PropTypes.func.isRequired,
  handleShowInput: PropTypes.func.isRequired,
  stateData: PropTypes.shape({
    name: PropTypes.string,
    salesMarkup: PropTypes.number,
    isVat: PropTypes.bool,
    loyalty: PropTypes.number,
  }),
  classes: PropTypes.shape({
    categoryRow: PropTypes.string,
    categoryCell: PropTypes.string,
    categoryNameCell: PropTypes.string
  })
};

export default CategoryInput;
