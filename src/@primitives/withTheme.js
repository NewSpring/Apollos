import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

const DEFAULT_MAPPER_FN = ({ theme, ...otherProps } = {}) => ({ ...theme, ...otherProps });

export default function (mapperFn = DEFAULT_MAPPER_FN) {
  return compose(
    getContext({
      theme: PropTypes.shape({
        primaryColor: PropTypes.string,
        secondaryColor: PropTypes.string,
      }),
    }),
    withProps(mapperFn),
  );
}
