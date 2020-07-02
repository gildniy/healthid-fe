import React from 'react';
import PropType from 'prop-types';
import { Grid } from '@material-ui/core';

const OutletDetails = ({ renderTextField, classes, outlet }) => {
  const contactDict = outlet.outletcontactsSet.reduce((previous, current) => {
    previous[current.dataKey] = current.dataValue;
    return previous;
  }, {});

  return (
    <Grid container spacing={24} className={classes.containerGrid}>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'outletName', 'Outlet Name', outlet.name
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'outletType', 'Outlet Type', outlet.kind.name
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'id ', 'Outlet ID', outlet.id
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'dateLaunched', 'Date Launched', outlet.outletmetaSet[0] && outlet.outletmetaSet[0].dataValue
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'outletTaxNumber ', 'Outlet Tax Number', outlet.taxNumber,
        )}
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'assignedUsers ', 'Assinged Users', outlet.users.length,
        )}
      </Grid>
      <Grid item xs={4} style={{ marginBottom: '20px' }}>
        <div>
          <div><span className={classes.addressTextHeader}>Address</span></div>
          <div style={{ marginTop: '5px' }}>
            <span className={classes.addressText} />
          </div>
          <div>
            <span className={classes.addressText}>
              {contactDict.address_line1}
              {', '}
            </span>
          </div>
          <div><span className={classes.addressText}>{contactDict.address_line2}</span></div>
          <div>
            <span className={classes.addressText}>
              {outlet.city.name}
              {', '}
            </span>
            <span className={classes.addressText}>{outlet.city.country.name}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        {renderTextField(
          classes.descriptionFields, 'total cost ', 'Phone #', outlet.business.phoneNumber,
        )}
      </Grid>
    </Grid>
  );
};

OutletDetails.propTypes = {
  classes: PropType.instanceOf(Object).isRequired,
  outlet: PropType.instanceOf(Object).isRequired,
  renderTextField: PropType.func.isRequired,
};

export default OutletDetails;
