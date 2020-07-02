import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, withStyles
} from '@material-ui/core';
import SatisfiedIcon from '../../assets/images/Smiley icons/Active smileys/satisfied - active.png';
import Neutral from '../../assets/images/Smiley icons/Active smileys/neutral - active.png';
import UnsatisfiedIcon from '../../assets/images/Smiley icons/Active smileys/unsatisfied -active.png';
import VeryUsatisfiedIcon from '../../assets/images/Smiley icons/Active smileys/very unsatisfied - active.png';
import VerySatisfiedIcon from '../../assets/images/Smiley icons/Active smileys/very satisfied - active.png';
import { QualityIconsStyles } from '../../assets/styles/stock/batch/batchDetailsStyles';


const QualityIcons = ({ classes, serviceQuality }) => {
  let IconUrl = '';
  let messageText = '';


  const displayIcon = (id) => {
    switch (id) {
    case 1:
      IconUrl = VeryUsatisfiedIcon;
      messageText = 'Very Unsatisfied';
      break;
    case 2:
      IconUrl = UnsatisfiedIcon;
      messageText = 'Unsatisfied';
      break;
    case 3:
      IconUrl = Neutral;
      messageText = 'Neutral';
      break;
    case 4:
      IconUrl = SatisfiedIcon;
      messageText = 'Satisfied';
      break;
    case 5:
      IconUrl = VerySatisfiedIcon;
      messageText = 'Very Satisfied';
      break;
    default:
      break;
    }
  };

  displayIcon(serviceQuality);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="p" align="left" style={QualityIconsStyles.iconLabel}>
        Service Quality
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item xs={1}>
          <img src={IconUrl} style={{ width: '25px', position: 'relative', top: '-3px' }} alt="approve" />
        </Grid>
        <Grid item xs={6}>
          <span className={classes.IconText}>{messageText}</span>
        </Grid>
      </Grid>
    </Fragment>
  );
};

QualityIcons.propTypes = {
  serviceQuality: PropTypes.number.isRequired,
  classes: PropTypes.instanceOf(Object),
};

QualityIcons.defaultProps = {
  classes: {},
};

export default withStyles(QualityIconsStyles)(QualityIcons);
