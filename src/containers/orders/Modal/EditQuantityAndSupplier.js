import React, { Fragment, useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Modal from '@material-ui/core/Modal';
import {
  Paper, Grid, Typography, TextField, Select, MenuItem
} from '@material-ui/core';
import { ModalStyles } from '../../../assets/styles/orders/order';
import { CustomIconButton } from '../../../components/stock_control/utils/utils';
import approveIcon from '../../../assets/images/stock/approve.png';
import cancelIcon from '../../../assets/images/sellScreen/Cancel.png';
import editProductIcon from '../../../assets/images/stock/edit.png';
import notify from '../../../components/shared/Toaster';
import UPDATE_PRODUCT_BATCH from '../../../mutations/updateProductBatch';

export const EditQuantityAndSupplier = (props) => {
  const {
    numSelected, selectedRow, deselect, updateQuantityAndSupplier
  } = props;
  const productId = selectedRow.length ? selectedRow[0].id : null;
  const productName = selectedRow.length ? selectedRow[0].name : null;
  const productSKU = selectedRow.length ? selectedRow[0].sku : null;
  const productQuantity = selectedRow.length ? selectedRow[0].quantity : null;
  const productCurrentSupplierId = selectedRow.length ? selectedRow[0].currentSupplierId : null;
  const productCurrentSupplierName = selectedRow.length ? selectedRow[0].currentSupplierName : null;
  const productPreSupplierId = selectedRow.length ? selectedRow[0].preferredSupplierId : null;
  const productPreSupplierName = selectedRow.length ? selectedRow[0].preferredSupplierName : null;
  const productBackupSupplierId = selectedRow.length ? selectedRow[0].backupSupplierId : null;
  const productBackupSupplierName = selectedRow.length ? selectedRow[0].backupSupplierName : null;

  const [open, setOpen] = useState(false);
  const [prodId, setProdId] = useState('');
  const [name, setName] = useState('');
  const [sku, setSKU] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentSupplierId, setCurrentSupplierId] = useState('');
  const [currentSupplierName, setCurrentSupplierName] = useState('');
  const [preferredSupplierId, setPreferredSupplierId] = useState('');
  const [preferredSupplierName, setPreferredSupplierName] = useState('');
  const [backupSupplierId, setBackupSupplierId] = useState('');
  const [backupSupplierName, setBackupSupplierName] = useState('');

  useEffect(() => {
    setQuantity(productQuantity);
  }, []);

  const handleOpen = () => {
    if (numSelected === 1) {
      setProdId(productId);
      setName(productName);
      setSKU(productSKU);
      setQuantity(productQuantity);
      setCurrentSupplierId(productCurrentSupplierId);
      setCurrentSupplierName(productCurrentSupplierName);
      setPreferredSupplierId(productPreSupplierId);
      setPreferredSupplierName(productPreSupplierName);
      setBackupSupplierId(productBackupSupplierId);
      setBackupSupplierName(productBackupSupplierName);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    deselect([]);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setCurrentSupplierId(event.target.value);
  };

  const handleSave = () => {
    updateQuantityAndSupplier({
      variables: {
        ids: [prodId],
        quantity,
        supplierId: currentSupplierId
      }
    }).then(() => {
      notify('Information updated successfully');
      handleClose();
    }).catch((error) => {
      if (!currentSupplierId) {
        notify('You cannot update because the product does not have supplier. Assign supplier first');
      } else {
        notify(`You cannot exceed the current reorder maximum of ${error.message.slice(49)} products`);
      }
    });
  };

  return (
    <Fragment>
      <CustomIconButton
        toolTip={numSelected === 1 ? 'Edit quantity & supplier' : 'Select 1 product to edit quantity & supplier'}
        onClickHandler={handleOpen}
      >
        <img src={editProductIcon} style={{ width: '24px', height: '24px' }} alt="edit" />
      </CustomIconButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableAutoFocus
        disableRestoreFocus
        open={open}
      >
        <Paper elevation={2} style={ModalStyles.wrapper}>
          <Grid>
            <Grid container justify="space-between" style={ModalStyles.editHeader}>
              <Grid item style={ModalStyles.titleSkuContainer}>
                <Grid container style={ModalStyles.titleContainer}>
                  <Grid item>
                    <Typography style={ModalStyles.orderName}>{`${name} Order`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={ModalStyles.orderSKU}>{`(SKU ${sku})`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={ModalStyles.iconContainer}>
                <CustomIconButton
                  toolTip="Save"
                  onClickHandler={handleSave}
                >
                  <img src={approveIcon} style={ModalStyles.approveIcon} alt="save" />
                </CustomIconButton>
                <CustomIconButton
                  toolTip="Cancel"
                  onClickHandler={handleClose}
                >
                  <img src={cancelIcon} style={ModalStyles.cancelIcon} alt="cancel" />
                </CustomIconButton>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item style={ModalStyles.quantityContainer}>
                <Grid>
                  <Typography style={ModalStyles.subTitle}>QTY Ordered</Typography>
                </Grid>
                <Grid>
                  <TextField id="standard-basic" value={quantity} onChange={handleQuantityChange} style={ModalStyles.textField} />
                </Grid>
              </Grid>
              <Grid item style={ModalStyles.supplierContainer}>
                <Grid>
                  <Typography style={ModalStyles.subTitle}>Supplier</Typography>
                </Grid>
                <Grid>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentSupplierId}
                    onChange={handleSupplierChange}
                    style={ModalStyles.select}
                  >
                    {currentSupplierId
                      ? (
                        <MenuItem value={currentSupplierId}>
                          {`${currentSupplierName} (current supplier)`}
                        </MenuItem>
                      )
                      : null
                    }
                    {preferredSupplierId
                      && (preferredSupplierName !== 'QuickBookVendor(default)'
                        && preferredSupplierName !== 'Cosdiv enterprises')
                      ? (
                        <MenuItem value={preferredSupplierId}>
                          {`${preferredSupplierName} (preferred supplier)`}
                        </MenuItem>
                      )
                      : null
                    }
                    {backupSupplierId
                      && (backupSupplierName !== 'QuickBookVendor(default)'
                        && backupSupplierName !== 'Cosdiv enterprises')
                      ? (
                        <MenuItem value={backupSupplierId}>
                          {`${backupSupplierName} (backup supplier)`}
                        </MenuItem>
                      )
                      : null
                    }
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Fragment>
  );
};

EditQuantityAndSupplier.propTypes = {
  numSelected: PropTypes.number,
  selectedRow: PropTypes.arrayOf(object),
  deselect: PropTypes.func.isRequired,
  updateQuantityAndSupplier: PropTypes.func.isRequired,
};

EditQuantityAndSupplier.defaultProps = {
  numSelected: 0,
  selectedRow: [],
};

const UPDATE_PRODUCT_BATCH_MUTATION = graphql(UPDATE_PRODUCT_BATCH, { name: 'updateQuantityAndSupplier' });

export default compose(UPDATE_PRODUCT_BATCH_MUTATION)(EditQuantityAndSupplier);
