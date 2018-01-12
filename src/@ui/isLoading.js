import { branch, getContext, withContext } from 'recompose';
import PropTypes from 'prop-types';

// Both of these HOCs deal with context, therefore they should be used
// above "pure" in a recompose `compose` chain.

// Checks if the component has an "isLoading" prop.
// If it doesn't it, it passes in context.
// This makes easy to build components that respond to either props
// or context for rendering placeholder / loading state.
export const getIsLoading = branch(
  props => !Object.hasOwnProperty.call(props, 'isLoading'),
  getContext({ isLoading: PropTypes.bool }),
);

// Allows a component to accept an "isLoading" prop to pass down
// into context.
export const withIsLoading = withContext(
  { isLoading: PropTypes.bool },
  ({ isLoading }) => ({ isLoading }),
);
