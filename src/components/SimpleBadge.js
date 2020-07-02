import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const styles = ({
  customBadge: {
    backgroundColor: '#FAF33E',
    color: '#000',
    border: 'solid 2px #fff'
  }
});

function SimpleBadge({ children, value, classes }) {
  return (
    <div>
      <Badge
        classes={{ badge: classes.customBadge }}
        badgeContent={value}
      >
        { children }
      </Badge>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styles)(SimpleBadge);
