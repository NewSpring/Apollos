import { matchPath } from 'react-router';

const matchLocationToPath = (path, location) => matchPath(path, {
  path: location.pathname,
  strict: true,
  exact: true,
});

export default matchLocationToPath;
