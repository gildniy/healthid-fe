import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Divider, TextField
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import withAuth from '../../withAuth';
import notify from '../../shared/Toaster';
import { batchDetailsStyles } from '../../../assets/styles/stock/batch/batchDetailsStyles';
import { SeparatorStyles } from '../../../assets/styles/shared/separator';
import BatchInformation from './batchInformation';
import BatchDetails from './batchDetails';
import BatchPageHeader from './batchPageHeader';
import { Capitalize } from '../../ordersAndSuppliers/Templates/helpers';
import UPDATE_PRODUCT_BATCH from '../../../mutations/updateProductBatch';

const SingleBatch = (props) => {
  const { classes, location: { state } } = props;
  const {
    productName, batchDetails, productId, currency
  } = state;

  const [edit, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [batchInfo, setBatchInfo] = useState({ ...batchDetails });

  const renderTextField = (style, name, label, value) => (
    <TextField
      className={style}
      id={name}
      name={name}
      label={label}
      value={value}
      fullWidth
      InputProps={{ disableUnderline: true, readOnly: true }}
    />
  );

  const toggleEdit = (value) => { setEdit(value); };

  const handleSearchChange = (id, value) => {
    const { supplier } = batchInfo;
    setBatchInfo({
      ...batchInfo,
      supplier: {
        ...supplier,
        id,
        name: value
      }
    });
  };

  // Handles Changes of Fields when editing
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setBatchInfo({
      ...batchInfo,
      [name]: value,
    });
  };

  const handleDateChange = (Name, event) => {
    const name = Name;
    const value = new Date(event).toISOString().split('T')[0];
    setBatchInfo({
      ...batchInfo,
      [name]: value,
    });
  };

  const saveEdit = () => {
    const { updateProductBatch } = props;
    const {
      expiryDate,
      dateReceived,
      batchRef,
      quantity,
      supplier,
      id,
      unitCost
    } = batchInfo;

    setSubmitting(true);
    updateProductBatch({
      variables: {
        ids: [id],
        batchRef,
        expiryDate,
        dateReceived,
        quantity: parseInt(quantity, 10),
        supplierId: supplier.id,
        unitCost: parseFloat(unitCost)
      }
    })
      .then(() => {
        notify('Batch updated successfully');
        setSubmitting(false);
        toggleEdit(false);
      })
      .catch((err) => {
        notify(`${err.message}`);
        setSubmitting(false);
      });
  };

  return (
    <Fragment>
      <BatchPageHeader
        toggleEdit={toggleEdit}
        productId={productId}
        classes={classes}
        edit={edit}
        saveEdit={saveEdit}
        submitting={submitting}
      />
      <Paper elevation={2} className={classes.paper}>
        <Fragment>
          <Typography paragraph variant="h6" align="center" style={SeparatorStyles.paperHeader}>
            {Capitalize(productName)}
            {' '}
            (
            {' '}
            {batchInfo.batchRef.split('-')[0].toUpperCase()}
            {' '}
            )
          </Typography>
          <Divider />
          <BatchInformation
            batchDetails={batchInfo}
            renderTextField={renderTextField}
            classes={classes}
            edit={edit}
            handleDateChange={handleDateChange}
          />
          <BatchDetails
            batchDetails={batchInfo}
            currency={currency}
            renderTextField={renderTextField}
            classes={classes}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSearchChange={handleSearchChange}
            edit={edit}
          />
          <div className={classes.spaceDiv} />
        </Fragment>
      </Paper>
    </Fragment>
  );
};

const UPDATE_BATCH = graphql(UPDATE_PRODUCT_BATCH, { name: 'updateProductBatch' });

SingleBatch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  updateProductBatch: PropTypes.func.isRequired,
};


export default
withAuth(compose(UPDATE_BATCH)(withStyles(batchDetailsStyles)(withRouter(SingleBatch))));
