import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

export default compose(
  getContext({
    theme: PropTypes.shape({
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string,
    }),
  }),
  mapProps(({ theme, ...otherProps } = {}) => ({ ...theme, ...otherProps })),
);
