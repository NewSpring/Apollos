/* eslint-disable react/prop-types */
import React from 'react';
import pick from 'lodash/pick';

export default Component => props => (
  <Component {...pick(props, Object.keys(Component.propTypes))}>
    {props.children}
  </Component>
);

