import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

const DEFAULT_MAPPER_FN = ({ theme, ...otherProps } = {}) => ({ ...theme, ...otherProps });

export default function (mapperFn = DEFAULT_MAPPER_FN) {
  return compose(
    getContext({
      theme: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
      }),
    }),
    mapProps(mapperFn),
  );
}
