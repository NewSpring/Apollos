import { branch, compose, mapProps } from 'recompose';
import { every } from 'lodash';
import withWindow from './withWindow';
import withTheme from '../withTheme';

const queryMatcher = ({ width, height }) => (selector, query) => {
  switch (query) {
    case 'maxWidth': return width < selector;
    case 'minWidth': return width > selector;
    case 'maxHeight': return height < selector;
    case 'minHeight': return height > selector;
    case 'minDeviceAspectRatio': return width / height > selector;
    case 'maxDeviceAspectRatio': return width / height < selector;
    default: return true;
  }
};

// Make it easy to do breakpoint-based component branching, a-la recompose's branch method.
// The "test" function should return an object that mirrors what you'd do in a css mediaQuery:
// import { enhancer as mediaQuery } from 'MediaQuery';
// mediaQuery(
//   ({ xs, lg }) => ({ minWidth: xs, maxWidth: lg }),
//   HigherOrderComponent,
//   ?HigherOrderComponent
// ): HigherOrderComponent
export default (getMediaQuery, ...args) => compose(
  withTheme(({ theme: { breakpoints = {} } = {} }) => ({ breakpoints })),
  withWindow,
  branch(({ breakpoints, window: { width, height }, ...ownProps }) => {
    const mediaQuery = getMediaQuery({ ...breakpoints, width, height }, ownProps);

    // We should only interpret `mediaQuery` if we have an object.
    // This allows the function you pass in to utilize more complex query logic, like:
    // mediaQuery(({ sm, lg, width }) => width < sm || width > lg, styles)
    // mediaQuery(({ sm }, ownProps) => ownProps.size < sm, styles)
    if (typeof mediaQuery !== 'object') {
      return !!mediaQuery;
    }

    return every(mediaQuery, queryMatcher({ width, height }));
  }, ...args),

  // clean up props
  mapProps(({ breakpoints, window, ...ownProps }) => ownProps),
);
