import PropTypes from 'prop-types';

const {
  string, objectOf
} = PropTypes;

export const ServiceIconsType = {
  style: objectOf(Object),
  fill: string,
  lineFill: string,
  stroke: string,
  opacity: string,
};

export default ServiceIconsType;
