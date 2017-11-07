import PropTypes from 'prop-types';
import React from 'react';
import { compose, pure, setPropTypes, withProps } from 'recompose';
import { flow, camelCase, upperFirst, kebabCase } from 'lodash';

import * as Icons from './icons';

const pascalCase = string => flow(camelCase, upperFirst)(string);

// Convenience component to render icons based on the icon's string name, like:
// <Icon name="skip-next" {...allOtherPropsPassedToComponent} />
//
// Can also import the icon directly:
// import { SkipNext } from 'Icon/icons';
// <SkipNext />
export default compose(
  pure,
  setPropTypes({
    name: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)).isRequired,
  }),
  withProps(({ name }) => ({ IconComponent: Icons[pascalCase(name)] })),
)(({ IconComponent, ...props }) => <IconComponent {...props} />);
