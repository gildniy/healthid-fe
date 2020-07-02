import React from 'react';
import PropTypes from 'prop-types';
import salesDialogStyles from '../../assets/css/salesDialogStyles';

const RenderNotesList = ({ products, mainCartNote }) => {
  let ProductsWithNotes;
  if (products.length) {
    ProductsWithNotes = products.filter(product => product.note);
  }
  if (ProductsWithNotes.length) {
    return ProductsWithNotes.map(({ productName, note }) => (
      <div style={{ paddingTop: '.5rem' }}>
        <span style={salesDialogStyles.headingDash}>-&nbsp;</span>
        <span style={salesDialogStyles.rowHeading}>{`[${productName}]`}</span>
        <span style={salesDialogStyles.rowNote}>{note}</span>
      </div>
    ));
  }
  if (ProductsWithNotes.length === 0 && !mainCartNote) {
    return <span style={{ paddingLeft: '0.45rem' }}>No Notes Available</span>;
  }

  return null;
};

RenderNotesList.propTypes = {
  products: PropTypes.arrayOf(Object).isRequired,
  mainCartNote: PropTypes.string.isRequired
};


export default RenderNotesList;
