import React from 'react';
import PropType from 'prop-types';
import {
  Grid, Typography, Divider, Paper, IconButton, Switch, FormControlLabel
} from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import { receiptTemplateStyles } from '../../assets/styles/modal/receiptTemplateStyles';


const OutletReceiptTemplate = ({
  handleTemplateChange, receiptState, classes,
  selectAll, setAllTemplateSwitch, handleCloseModal, handleSave
}) => (
  <Paper elevation={2}>
    <Grid container item justify="space-between">
      <Grid item xs={8}>
        <Typography variant="h6" style={{ ...receiptTemplateStyles.batchHeader, marginLeft: '3.5rem' }}>
          Manage Receipt Display
        </Typography>
      </Grid>
      <Grid container item xs={3} justify="flex-end" style={{ paddingRight: '20px' }}>
        <IconButton
          aria-label="Done"
          onClick={handleSave}
        >
          <Done />
        </IconButton>
        <IconButton
          aria-label="Close"
          onClick={handleCloseModal}
        >
          <Close />
        </IconButton>
      </Grid>
    </Grid>
    <Divider />
    <Grid container style={receiptTemplateStyles.gridContainer}>
      <Grid
        container
        item
        xs={12}
        justify="flex-end"
        style={{ ...receiptTemplateStyles.gridWrappers }}
      >
        <FormControlLabel
          control={(
            <Switch
              checked={selectAll}
              onChange={setAllTemplateSwitch}
              value="selectAll"
            />
          )}
          label="Select All"
        />
      </Grid>
      <div style={receiptTemplateStyles.dividerDiv}>
        <Typography
          paragraph
          align="left"
          gutterBottom
          style={receiptTemplateStyles.dividerHeaders}
        >
          Toggle to Manage Sale Information on your Receipt
        </Typography>
      </div>
      <Grid container spacing={24} className={classes.containerGrid} justify="space-between">
        {receiptState && Object.keys(receiptState).map(receipt => (
          <Grid item xs={4} style={receiptTemplateStyles.gridWrappers} key={receipt}>
            <FormControlLabel
              control={(
                <Switch
                  checked={receiptState[receipt].checked}
                  onChange={handleTemplateChange(receiptState[receipt].value)}
                  value={receiptState[receipt].value}
                />
              )}
              label={receiptState[receipt].label}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Paper>
);

OutletReceiptTemplate.propTypes = {
  receiptState: PropType.instanceOf(Object).isRequired,
  classes: PropType.instanceOf(Object).isRequired,
  handleCloseModal: PropType.func.isRequired,
  handleSave: PropType.func.isRequired,
  handleTemplateChange: PropType.func.isRequired,
  setAllTemplateSwitch: PropType.func.isRequired,
  selectAll: PropType.string.isRequired

};
export default OutletReceiptTemplate;
