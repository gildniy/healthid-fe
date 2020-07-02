import React from 'react';
import {
  Grid, Card, CardMedia
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Rating from '../Templates/Rating';
import { FieldTitle, getFields } from './SupplierFields';


const SupplierDescription = (props) => {
  const {
    classes, supplier, currentSupplier, activeOutlet
  } = props;
  const outletId = activeOutlet.id;
  const { supplierratingSet, supplierContacts: supplierscontactsSet } = currentSupplier;
  const { supplierContacts, supplierMeta } = supplier;
  const rating = supplierratingSet[0] && supplierratingSet[0].rating;
  const contacts = supplierContacts[0];
  const currentContacts = supplierscontactsSet.find(contact => contact.outlet.id === outletId);
  const FieldValues = getFields(currentContacts, contacts, classes);
  const { fieldsChanged } = FieldValues;
  const meta = supplierMeta[0];

  return (
    <>
      <Grid
        container
        spacing={24}
        className={classes.containerGrid}
      >
        <Grid container item xs={12}>
          <Grid container item xs={8} spacing={24}>
            <Grid item xs={12}>
              <div style={{ marginBottom: '30px' }} className={classes.category}>
                <FieldTitle changed title="Supplier ID" classes={classes} />
                <div style={{ marginTop: '5px' }}>
                  <span className={classes.addressText}>{supplier.id}</span>
                </div>
              </div>
              <div>
                <FieldTitle
                  changed={['addressLine1', 'addressLine2', 'lga', 'country', 'city']
                    .some(key => Object.keys(fieldsChanged).includes(key))}
                  title="Address"
                  classes={classes}
                />
                <FieldValues.Render name="addressLine1" />
                <FieldValues.Render name="addressLine2" />
                <FieldValues.Render name="lga" />
                <FieldValues.Render name="city_country" />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={0} className={classes.card}>
              <CardMedia
                className={classes.media}
                image={meta && meta.logo}
                title="Supplier Image"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid item xs={4}>
          <FieldTitle changed={'email' in fieldsChanged} title="Email" classes={classes} />
          <FieldValues.Render name="email" />
        </Grid>

        <Grid item xs={4}>
          <FieldTitle changed={'mobileNumber' in fieldsChanged} title="Mobile #" classes={classes} />
          <FieldValues.Render name="mobileNumber" />
        </Grid>

        <Grid container item xs={4}>
          <Rating rating={rating} starClass="supplierStar" />
        </Grid>
      </Grid>
    </>
  );
};

SupplierDescription.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    containerGrid2: PropTypes.string,
    category: PropTypes.string,
    card: PropTypes.string,
    media: PropTypes.string,
    descriptionFields: PropTypes.string,
    addressText: PropTypes.string,
    addressTextHeader: PropTypes.string
  }).isRequired,
  supplier: PropTypes.instanceOf(Object).isRequired,
  currentSupplier: PropTypes.instanceOf(Object).isRequired,
  activeOutlet: PropTypes.instanceOf(Object).isRequired
};

export default SupplierDescription;
