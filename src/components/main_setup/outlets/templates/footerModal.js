import React, { useState } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Modal from '../../../suppliers/Templates/SupplierNoteModal';

const FooterModal = () => {
  const initialState = {
    openAddModel: false,
    openConfirmationModel: false,
    openDetailModal: false,
    footerText: 'Thank you for shopping with us',
  };
  const [state, setState] = useState({ ...initialState });

  const handleopenAddModel = () => {
    setState({
      ...state,
      openAddModal: true
    });
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      openAddModal: false
    });
  };

  const handleSave = () => {
    setState({
      ...state,
      openAddModal: false
    });
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setState({
      ...state,
      footerText: value
    });
  };

  return (
    <>
      <Modal
        openAddModel={state.openAddModal}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleSaveNote={handleSave}
        note={state.footerText}
        headerText="Edit Footer Text"
      />
      <Tooltip title="Change Footer Text">
        <IconButton onClick={handleopenAddModel} style={{ marginTop: '5px' }}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default FooterModal;
