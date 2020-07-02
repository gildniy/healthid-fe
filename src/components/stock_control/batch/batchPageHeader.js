import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import PageHeader from '../../shared/PageDetails/pageHeader';
import Loader from '../../shared/Loader';

const BatchPageHeader = ({
  productId, edit, classes, saveEdit, toggleEdit, submitting,
}) => (
  <PageHeader title="Back to Stocks" previousPage={`/products/${productId}/details`}>
    {edit ? (
      <>
        { submitting ? <Loader name="submitLoader" size={30} />
          : (
            <>
              <Button
                variant="outlined"
                className={classes.approveButton}
                onClick={saveEdit}
              >
                Save Edit
              </Button>
              <Button
                className={classes.editButton}
                variant="outlined"
                onClick={() => toggleEdit(false)}
              >
                Cancel
              </Button>
            </>
          )
        }
      </>
    ) : (
      <>
        <Button
          variant="outlined"
          className={classes.editButton}
          onClick={() => toggleEdit(true)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          disabled
          className={classes.barCodeBtn}
          style={{ color: '#fff' }}
        >
          Manage  BarCode
        </Button>
      </>
    ) }

  </PageHeader>
);

BatchPageHeader.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  productId: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  saveEdit: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,

};

export default BatchPageHeader;
