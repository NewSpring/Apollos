import { compose, mapProps } from 'recompose';
import { withRouter } from '../NativeWebRouter';

import Transitioner from './Transitioner';

const Stack = compose(
  mapProps(ownProps => ({ ownProps })),
  withRouter,
  mapProps(({ ownProps, ...routerProps }) => ({
    ...routerProps,
    ...ownProps,
  })),
)(Transitioner);

export default Stack;
