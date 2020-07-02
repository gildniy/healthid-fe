/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Paper, Typography, ListItem, ListItemAvatar, ListItemText,
  ListItemSecondaryAction, Avatar, IconButton
} from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { MainSetupStyles as styles } from '../../assets/styles/setup';

const MenuItem = ({
  id, title, description, icon, link, active, toggleActive, last
}) => (
  <Link to={link} style={styles.itemLink}>
    <Paper elevation={2} style={!last ? styles.paperMenu : {}}>
      <ListItem
        style={active !== id ? styles.listItem : styles.listItemHovered}
        onMouseEnter={() => toggleActive(id)}
        onMouseOut={toggleActive}
      >
        <ListItemAvatar
          onMouseEnter={() => toggleActive(id)}
          onMouseOut={toggleActive}
        >
          <Avatar src={icon} />
        </ListItemAvatar>
        <ListItemText
          style={styles.menuText}
        >
          <Typography
            variant="h6"
            style={styles.listItemTitle}
            onMouseEnter={() => toggleActive(id)}
            onMouseOut={toggleActive}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            style={styles.listItemDescription}
            onMouseEnter={() => toggleActive(id)}
            onMouseOut={toggleActive}
          >
            {description}
          </Typography>
        </ListItemText>
        { active === id ? (
          <ListItemSecondaryAction
            onMouseEnter={() => toggleActive(id)}
          >
            <IconButton style={styles.listContinueButton}>
              <KeyboardArrowRight fontSize="large" />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null }
      </ListItem>
    </Paper>
  </Link>
);

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.string,
  toggleActive: PropTypes.func.isRequired,
  last: PropTypes.bool,
};

MenuItem.defaultProps = {
  active: '',
  last: false,
};

export default MenuItem;
