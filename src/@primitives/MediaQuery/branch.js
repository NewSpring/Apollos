import { branch, compose, renderComponent } from 'recompose';
import { get } from 'lodash';
import withWindow from './withWindow';
import withTheme from '../withTheme';

// Make it easy to do breakpoint-based component branching, a-la recompose's branch method,
// except the first argument is an object to test against versus a function.
// This object mirrors the props supported by <MediaQuery>:
// branch(
//   { min: 'xs', max: 'lg' },
//   HigherOrderComponent,
//   ?HigherOrderComponent
// ): HigherOrderComponent
const responsiveBranch = ({ min, max }, ...args) => compose(
  withTheme(({ theme: { breakpoints } }) => ({ breakpoints })),
  withWindow,
  branch(({ breakpoints, window: { width } }) => {
    const minSelector = get(breakpoints, min, 0);
    const maxSelector = get(breakpoints, max, 0);
    return (minSelector ? width > minSelector : true) &&
      (maxSelector ? width < maxSelector : true);
  }, ...args),
);

export default responsiveBranch;

// Our components should be mobile first. This allows us to render a
// different component on larger screens then the given breakpoint.
// Usage is like: renderOnLargerScreens(OtherComponent)(PrimaryComponent)
export const renderOnLargerScreens = (component, breakpoint = 'md') => responsiveBranch(
  { min: breakpoint },
  renderComponent(component),
);
