import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button, Paper, Icon, Tooltip, Zoom,
  Typography
} from '@material-ui/core';
import { NotesIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

const DialogHeader = (props) => {
  const {
    processing,
    handleBackToSalesSummary,
    handleDisplayNotesPopper
  } = props;

  const [, dispatch] = Object.values(useStateValue());

  const handleBackToSellScreen = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openPaymentDialog: false }
    });
  };

  return (
    <Grid container>
      <Paper elevation={processing ? 0 : 1} style={salesDialogStyles.titlePaperStyle}>
        <Grid item container xs={12} justify={processing ? 'flex-start' : 'space-around'}>
          <Grid container item xs={11} style={salesDialogStyles.dialogTitleStyle}>
            <Button
              style={salesDialogStyles.arrowButton}
              onClick={processing ? handleBackToSalesSummary : handleBackToSellScreen}
            >
              <Tooltip title={processing ? 'To Sales Summary' : 'To Product Cart'} TransitionComponent={Zoom}>
                <Icon>arrow_back</Icon>
              </Tooltip>
            </Button>
            <Typography variant="h6" style={salesDialogStyles.arrowLabel}>
              {processing ? 'Payment Summary' : 'Sales Summary'}
            </Typography>
          </Grid>
          {
            !processing && (
              <Grid container item xs={1} alignContent="center">
                <Tooltip title="Show Notes" TransitionComponent={Zoom} id="tool-tip">
                  <NotesIcon
                    id="notesAnchor"
                    style={salesDialogStyles.notesIcon}
                    onClick={e => handleDisplayNotesPopper(e)}
                  />
                </Tooltip>
              </Grid>
            )
          }

        </Grid>
      </Paper>
    </Grid>
  );
};

DialogHeader.propTypes = {
  processing: PropTypes.bool.isRequired,
  handleBackToSalesSummary: PropTypes.func.isRequired,
  handleDisplayNotesPopper: PropTypes.func.isRequired
};

export default DialogHeader;
