import React, { Fragment, useState, useEffect } from 'react';
import { compose, graphql } from 'react-apollo';
import PropType from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button, TextField,
  Paper, Divider, Typography, withStyles
} from '@material-ui/core';
import PageHeader from '../../shared/PageDetails/pageHeader';
import { SeparatorStyles } from '../../../assets/styles/shared/separator';
import { batchDetailsStyles } from '../../../assets/styles/stock/batch/batchDetailsStyles';
import RegistersTemplate from './templates/registersTemplate';
import ReceiptTemplate from './templates/receiptTemplate';
import OutletDetails from './templates/viewOutletDetails';
import BatchDetailDialog from '../../shared/batch/batchDetailDialog';
import OutletReceiptTemplate from '../../utils/outletReceiptTemplate';
import initialState from './templates/receiptInitialState';
import notify from '../../shared/Toaster';
import { UPDATE_RECEIPT_TEMPLATE } from '../../../mutations/setup/outlets/receiptTemplate';


const SingleOutletPage = ({
  classes, history, updateReceipt, outlet, outletRefetch
}) => {
  const [templateSwitch, setTemplateSwitch] = useState({ ...initialState });
  const [selectAll, setSelectAll] = useState(true);
  const [receipt, setReceiptOpen] = useState({ receiptId: '', open: false });

  // Setups the register template
  const setUpTemplate = () => {
    const templateRadios = { ...templateSwitch };

    Object.keys(templateSwitch).forEach((name) => {
      templateRadios[name].checked = true;
    });
  };

  useEffect(() => {
    setUpTemplate();
  }, []);


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

  const handleReceiptTemplate = () => {
    setReceiptOpen({
      ...receipt,
      open: true
    });
  };
  const handleReceiptTemplateClose = () => {
    setReceiptOpen({
      ...receipt,
      open: false
    });
  };

  const handleTemplateChange = name => (event) => {
    const obj = templateSwitch[name];
    setTemplateSwitch({
      ...templateSwitch,
      [name]: {
        ...obj,
        checked: event.target.checked
      }
    });
  };

  // Toogles select all
  const setAllTemplateSwitch = () => {
    const templateRadios = { ...templateSwitch };

    Object.keys(templateSwitch).forEach((name) => {
      templateRadios[name].checked = !selectAll;
    });
    setTemplateSwitch({
      ...templateRadios,
    });
    setSelectAll(!selectAll);
  };

  // Save Receipt Modal
  const handleSaveReceipt = () => {
    const { receipttemplateSet } = outlet;
    const templateRadios = { };

    Object.keys(receipttemplateSet[0]).forEach((name) => {
      templateRadios[name] = templateSwitch[name] ? (templateSwitch[name].checked || false) : false;
    });
    delete templateRadios.id;
    updateReceipt({
      variables: { id: receipt.receiptId, ...templateRadios }
    }).then(() => {
      notify('Receipt Template updated successfully');
      handleReceiptTemplateClose();
    })
      .catch((err) => {
        notify(`${err.message}`);
      });
  };

  return (
    <Fragment>
      <PageHeader title="Back to Outlets" previousPage="/main_setup/outlets_registers">
        <Button
          variant="outlined"
          className={classes.editButton}
          onClick={() => history.push({
            pathname: `/main_setup/outlets/edit/${outlet.id}`,
            state: { outlet }
          })}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          className={classes.preferenceBtn}
          onClick={() => history.push(`/main_setup/preferences/${outlet.id}`)}
        >
          Open Preferences
        </Button>
      </PageHeader>
      <Paper elevation={2} className={classes.paper}>
        <Fragment>
          <Typography paragraph variant="h6" align="center" style={SeparatorStyles.paperHeader}>
            Outlets &amp; Registers
          </Typography>
          <Divider />
        </Fragment>
        <OutletDetails classes={classes} outlet={outlet} renderTextField={renderTextField} />
        {outlet.kind.name !== 'storefront' ? ('') : (
          <>
            <RegistersTemplate
              classes={classes}
              registers={outlet.outletRegister}
              renderTextField={renderTextField}
              receipt={receipt}
              outlet={outlet}
              outletRefetch={outletRefetch}
            />
            <ReceiptTemplate
              handleReceiptTemplate={handleReceiptTemplate}
              classes={classes}
              renderTextField={renderTextField}
            />
            <BatchDetailDialog open={receipt.open} handleCloseDialog={handleReceiptTemplateClose}>
              <OutletReceiptTemplate
                classes={classes}
                selectAll={selectAll}
                setAllTemplateSwitch={setAllTemplateSwitch}
                handleTemplateChange={handleTemplateChange}
                receiptState={templateSwitch}
                handleCloseModal={handleReceiptTemplateClose}
                handleSave={handleSaveReceipt}
              />
            </BatchDetailDialog>
          </>
        )}
      </Paper>
    </Fragment>
  );
};

SingleOutletPage.propTypes = {
  classes: PropType.instanceOf(Object).isRequired,
  outlet: PropType.instanceOf(Object).isRequired,
  history: PropType.instanceOf(Object).isRequired,
  updateReceipt: PropType.func.isRequired,
  outletRefetch: PropType.func.isRequired,
};
SingleOutletPage.defaultProps = {

};

const UPDATE_RECEIPT = graphql(UPDATE_RECEIPT_TEMPLATE, { name: 'updateReceipt' });

export default compose(UPDATE_RECEIPT)(
  withStyles(batchDetailsStyles)(withRouter(SingleOutletPage))
);
