import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';

export default getContext({
  theme: PropTypes.shape({
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
  }),
});
