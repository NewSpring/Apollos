import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import { THEME_PROPS } from './constants';


const DEFAULT_MAPPER_FN = ({ theme } = {}) => ({ ...theme });

export default function (mapperFn = DEFAULT_MAPPER_FN) {
  return compose(
    getContext({
      theme: PropTypes.shape(THEME_PROPS),
    }),
    mapProps(({ theme, ...otherProps }) => ({
      ...otherProps,
      ...mapperFn({ theme, ...otherProps }),
    })),
  );
}
