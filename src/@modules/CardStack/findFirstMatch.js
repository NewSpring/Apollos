
import { Children, isValidElement, cloneElement } from 'react';
import { matchPath } from '../NativeWebRouter';

// See https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js
// for the reference implementation
export default function findFirstMatch(children, location) {
  let match;
  let child;
  Children.forEach(children, (element) => {
    if (match == null && isValidElement(element)) {
      const {
        path: pathProp, exact, strict, sensitive, from,
      } = element.props;
      const path = pathProp || from;

      child = element;
      match = matchPath(location.pathname, {
        path, exact, strict, sensitive,
      });
    }
  });

  return match ? cloneElement(child, { location, computedMatch: match }) : null;
}
