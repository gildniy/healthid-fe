import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import { savePDF } from '@progress/kendo-react-pdf';
import {
  Grid, Grow, Paper, Popper, IconButton, Typography, Divider,
  withStyles, ClickAwayListener
} from '@material-ui/core';
import print from '../../assets/images/sellScreen/print.png';
import save from '../../assets/images/sellScreen/save.png';
import { ToolbarStyles } from '../../assets/styles/stock/stock';
import SavePrintTypes from '../../providers/reducers/savePrint/savePrintTypes';

import { useStateValue } from '../../providers/stateProvider';

const SavePrintPopper = ({
  classes,
  fileName,
  componentRef,
  popperHeader,
}) => {
  const [{
    savePrint: { popperOpen, anchorEl }
  }, dispatch] = Object.values(useStateValue());

  const handlePrintButton = () => {
    dispatch({
      type: SavePrintTypes.TOGGLE_POPPER_OPEN,
      payload: ''
    });
  };

  const handleSaveButton = (html) => {
    savePDF(html, {
      scale: 0.6,
      paperSize: 'A4',
      repeatHeaders: true,
      landscape: true,
      fileName,
      margin: 0,
      top: 10
    });
    handlePrintButton();
  };

  return (
    <Fragment>
      <Popper
        open={popperOpen}
        anchorEl={anchorEl}
        className={classes.popper}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => handlePrintButton()}>
            <Grow {...TransitionProps}>
              <Paper elevation={2} className={classes.savePrintPaper}>
                <Grid container justify="center">
                  {popperHeader && (
                    <Grid item xs={12}>
                      <Typography variant="p" className={classes.savePrintPadding}>
                        {popperHeader}
                      </Typography>
                      <Divider />
                    </Grid>
                  )}
                  <Grid item container justify="space-evenly" className={classes.savePrintPadding}>
                    <Grid item xs={6} style={{ flexBasis: 0 }}>
                      <ReactToPrint
                        trigger={() => (
                          <IconButton>
                            <img src={print} alt="print" className={classes.printButton} />
                          </IconButton>
                        )}
                        content={() => componentRef.current}
                        onBeforePrint={handlePrintButton}
                      />
                      <Typography variant="h6" className={classes.savePrintTypo}>Print</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        className={classes.saveButton}
                        onClick={() => handleSaveButton(componentRef.current)}
                      >
                        <img src={save} alt="save" className={classes.saveButtonImg} />
                      </IconButton>
                      <Typography variant="h6" className={classes.savePrintTypo}>Save to computer</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </Fragment>
  );
};

SavePrintPopper.propTypes = {
  classes: PropTypes.instanceOf(Object),
  fileName: PropTypes.string,
  componentRef: PropTypes.instanceOf(Object),
  popperHeader: PropTypes.string
};

SavePrintPopper.defaultProps = {
  classes: {},
  fileName: '',
  componentRef: {},
  popperHeader: ''

};

export default withStyles(ToolbarStyles)(SavePrintPopper);
