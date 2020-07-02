import React from 'react';
import PropTypes from 'prop-types';
import CustomSelectField from './customSelectField';

export const RenderCustomSelectField = ({
  options,
  label,
  value,
  handleOptionChange
}) => (
  <CustomSelectField
    label={label}
    options={options
    && options.map(
      data => ({
        ...data,
        label: data.name,
      })
    )
    }
    value={{ label: value }}
    disableUnderline={false}
    onOptionChange={handleOptionChange}
    menuHeight="10rem"
  />
);

RenderCustomSelectField.propTypes = {
  options: PropTypes.arrayOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};

export default RenderCustomSelectField;
