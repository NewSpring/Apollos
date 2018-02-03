import PropTypes from 'prop-types';
import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import { flow, camelCase, upperFirst, kebabCase } from 'lodash';

import Placeholder from '@ui/Placeholder';
import * as Icons from './icons';

const pascalCase = string => flow(camelCase, upperFirst)(string);

// Convenience component to render icons based on the icon's string name, like:
// <Icon name="skip-next" {...allOtherPropsPassedToComponent} />
//
// Can also import the icon directly:
// import { SkipNext } from 'Icon/icons';
// <SkipNext />

const enhance = compose(
  pure,
  setPropTypes({
    name: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)).isRequired,
    size: PropTypes.number,
    fill: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
);

const Icon = enhance(({
  name,
  size,
  isLoading = false,
  ...otherProps
}) => {
  const IconComponent = Icons[pascalCase(name)];
  return (
    <Placeholder.Media
      size={size === undefined ? 32 : size} // 32 is the default size used within the svg component
      hasRadius
      onReady={!isLoading}
    >
      <IconComponent size={size} {...otherProps} />
    </Placeholder.Media>
  );
});

export default Icon;
