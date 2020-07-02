import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography, IconButton } from '@material-ui/core';
import withAuth from '../../withAuth';
import {
  Next,
  Previous,
  PreviousDisabled,
  NextDisabled,
} from '../../../assets/SvgIcons/productDuplicateSvgs';
import { ProductDuplicationStyles } from '../../../assets/styles/products/ImportProductStyles';
import '../../../assets/styles/products/productDialog.css';
import confirmIcon from '../../../assets/images/sellScreen/Confirm.png';
import cancelIcon from '../../../assets/images/sellScreen/Cancel.png';
import editIcon from '../../../assets/images/products/update.png';
import skipIcon from '../../../assets/images/products/skip.png';
import { StateContext } from '../../../providers/stateProvider';


export class DisplayProductDuplicates extends Component {
    state = {
      currentPage: 1,
      duplicatesPerPage: 8,
      opacity: {}
    }

    handleNext = () => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    }

    handlePrevious = () => {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }));
    }

    setOpacity = (index, opacity) => {
      this.setState(prevState => ({
        ...prevState,
        opacity: {
          ...prevState.opacity,
          [index]: opacity
        },
      }));
    }

    static contextType = StateContext;

    render() {
      const {
        handleCloseProductDuplicates,
        duplications,
        handleUpload,
        handleViewEditDuplicates,
        onProductDuplication
      } = this.props;

      const { currentPage, duplicatesPerPage, opacity } = this.state;
      const indexOfLast = currentPage * duplicatesPerPage;
      const indexOfFirst = indexOfLast - duplicatesPerPage;
      const currentDuplicates = duplications.slice(indexOfFirst, indexOfLast);
      const lastPage = Math.ceil(duplications.length / duplicatesPerPage);

      return (
        <Dialog
          maxWidth="lg"
          open
          style={{ backgroundColor: 'rgba(100, 100, 100, 0.6)' }}
          BackdropProps={{
            invisible: true
          }}
        >
          <div className="table-responsive">
            <Table>
              <TableHead>
                <TableCell className="cell">
                  <div className="th-title">{`${currentDuplicates.length} Duplicates`}</div>
                  <div className="th-action">
                    <div className="actions">
                      <button type="button" className="actions1" onClick={() => { handleUpload(); handleCloseProductDuplicates(); }}>
                        <img src={confirmIcon} alt="confirm" />
                      </button>
                    </div>
                    <div className="actions">
                      <button type="button" className="actions2" onClick={handleCloseProductDuplicates}>
                        <img src={cancelIcon} alt="cancel" />
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableHead>
              <TableBody>
                {currentDuplicates.map((duplicate, index) => (
                  <TableRow key={duplicate.message}>
                    <TableCell component="th" scope="row" onMouseEnter={this.hover}>
                      <div className="t-row">
                        <div style={{ opacity: opacity[index] || 1 }}>
                          {duplicate.message}
                        </div>
                        <div className="th-action Taction">
                          <div className="btns">
                            <Tooltip title="Edit">
                              <button type="button" className="btns1" onClick={() => { handleViewEditDuplicates(duplicate); }}>
                                <img src={editIcon} alt="edit" />
                              </button>
                            </Tooltip>
                          </div>
                          <div className="btns">
                            <Tooltip title="Ignore">
                              <button
                                type="button"
                                className="btns2"
                                onClick={() => {
                                  onProductDuplication(duplicate.data['product name'], 'skip');
                                  this.setOpacity(index, 0.4);
                                }}
                              >
                                <img src={skipIcon} alt="cancel" className="cancelIcon" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow style={ProductDuplicationStyles.paginateProduct}>
                  {/* <TableCell style={ProductDuplicationStyles.paginateProduct}> */}
                  <Typography variant="body1" style={ProductDuplicationStyles.paginateProductDuplicationText}>
                    { indexOfFirst + 1 }
                    {'-'}
                    { indexOfLast >= duplications.length ? duplications.length : indexOfLast }
                    {' '}
                            of
                    {' '}
                    {duplications.length}
                  </Typography>
                  <IconButton
                    style={ProductDuplicationStyles.paginateArrow}
                    onClick={this.handlePrevious}
                    disabled={currentPage === 1}
                  >
                    {currentPage !== 1
                      ? <Previous style={ProductDuplicationStyles.previous} />
                      : <PreviousDisabled style={ProductDuplicationStyles.previous} />}
                  </IconButton>
                  <IconButton
                    disabled={currentPage === lastPage}
                    style={ProductDuplicationStyles.paginateArrow}
                    onClick={this.handleNext}
                  >
                    {currentPage !== lastPage
                      ? <Next />
                      : <NextDisabled />}
                  </IconButton>
                  {/* </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Dialog>
      );
    }
}

DisplayProductDuplicates.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleCloseProductDuplicates: PropTypes.func.isRequired,
  duplications: PropTypes.func.isRequired,
  handleViewEditDuplicates: PropTypes.func.isRequired,
  onProductDuplication: PropTypes.func.isRequired
};

export default withAuth(withRouter(DisplayProductDuplicates));
