import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import NewIcon from '../../../assets/images/New_Icon.png';

export const getFields = (currentFields, enteredFields, classes) => {
  const field = (color, text) => (
    <div style={{ marginTop: color === '#000000' ? '7px' : 0, color }}>
      <span className={classes.addressText}>{`${text}`}</span>
    </div>
  );

  const getDifference = (current = currentFields, entered = enteredFields) => {
    if (current.country) {
      current.city = { name: currentFields.city.name };
      current.country = { name: currentFields.country.name };
    }
    return _.transform(current, (result, value, key) => {
      if (!_.isEqual(value, entered[key])) {
        result[key] = (_.isObject(value) && _.isObject(entered[key]))
          ? getDifference(value, entered[key]) : value;
      }
    });
  };

  return {
    fieldsChanged: getDifference(),
    Render: ({ name }) => {
      let current = currentFields[name] || '';
      let entered = enteredFields[name] || '';
      if (name === 'city_country') {
        current = `${currentFields.city.name}, ${currentFields.country.name}`;
        entered = `${enteredFields.city.name}, ${enteredFields.country.name}`;
      }

      if (current === entered) return field('#000000', entered);
      return [
        field('#000000', entered),
        field('#702632', current)
      ];
    },
  };
};

export const FieldTitle = ({ changed, title, classes }) => (
  <>
    {
      changed
        ? (
          <span style={{ marginLeft: '-30px', marginRight: '9px' }}>
            <img alt="" src={NewIcon} style={{ width: '20px', marginBottom: '-5px' }} />
          </span>
        )
        : ''
    }
    <span className={classes.addressTextHeader}>{title}</span>
  </>
);

FieldTitle.propTypes = {
  changed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};
