import PropTypes from 'prop-types';
import { compose, mapProps, getContext } from 'recompose';
import { THEME_PROPS } from './createTheme';


const DEFAULT_MAPPER_FN = ({ theme } = {}) => ({ theme });

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
