import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Popover, Typography
} from '@material-ui/core';
import RenderNotesList from './notesList';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const Notes = ({
  isNotesPopperOpen,
  anchorEl,
  placement,
  handleClosePopOver,
  products,
  mainCartNote
}) => (
  <Popover
    id={1}
    open={isNotesPopperOpen}
    anchorEl={anchorEl}
    placement={placement}
    onClose={handleClosePopOver}
    PaperProps={{ square: true }}
    anchorOrigin={salesDialogStyles.notesPopOverAnchorOrigin}
    transformOrigin={salesDialogStyles.notesPopOverTransformOrigin}
  >
    <Grid container style={salesDialogStyles.notesPopOverGrid}>
      <Grid
        item
        xs={12}
        style={salesDialogStyles.notesPopOverGridItem}
      >
        <Typography variant="body2" style={salesDialogStyles.notesHeader}>
          NOTES
        </Typography>
        {mainCartNote && (
          <Fragment>
            <span style={salesDialogStyles.headingDash}>-&nbsp;</span>
            <span style={salesDialogStyles.rowHeading}>[GENERAL]</span>
            <span style={salesDialogStyles.rowNote}>{mainCartNote}</span>
          </Fragment>
        )}
        <RenderNotesList products={products} mainCartNote={mainCartNote} />
      </Grid>
    </Grid>
  </Popover>
);

Notes.propTypes = {
  isNotesPopperOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  placement: PropTypes.string.isRequired,
  handleClosePopOver: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  mainCartNote: PropTypes.string.isRequired,
};

export default Notes;
