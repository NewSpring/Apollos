import PropTypes from 'prop-types';
import React from 'react';
import { compose, pure, setPropTypes, withProps } from 'recompose';
import { flow, camelCase, upperFirst, kebabCase } from 'lodash';

import * as Icons from './icons';

const pascalCase = string => flow(camelCase, upperFirst)(string);

export default compose(
  pure,
  setPropTypes({
    name: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)).isRequired,
  }),
  withProps(({ name }) => ({ IconComponent: Icons[pascalCase(name)] })),
)(({ IconComponent, ...props }) => <IconComponent {...props} />);
