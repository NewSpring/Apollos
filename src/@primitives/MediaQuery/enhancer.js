import { branch, compose } from 'recompose';
import { find } from 'lodash';
import withWindow from './withWindow';
import withTheme from '../withTheme';

// Make it easy to do breakpoint-based component branching, a-la recompose's branch method,
// except the first argument is an object to test against versus a function.
// This object mirrors the props supported by <MediaQuery> and the intention would be to
// use it like a mediaQuery:
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

    // This logic is a litle goofy, but here's the intention:
    // We want to make sure that all terms in the provided media query are true.
    // Instead of iterating every term, we can exit if we come across a falsey term.
    // So we use `find` to look for a query that doesn't match the current window.
    // We then invert the result of `find` and return it.
    // TODO: refactor so we don't need 5 lines of explanation
    const mediaQueryMatches = !find(mediaQuery, (selector, query) => {
      switch (query) {
        case 'maxWidth': return !(width < selector);
        case 'minWidth': return !(width > selector);
        case 'maxHeight': return !(height < selector);
        case 'minHeight': return !(height > selector);
        case 'minDeviceAspectRatio': return !(width / height > selector);
        case 'maxDeviceAspectRatio': return !(width / height < selector);
        default: return true;
      }
    });

    return mediaQueryMatches;
  }, ...args),
);
