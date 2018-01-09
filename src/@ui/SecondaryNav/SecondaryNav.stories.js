import React from 'react';

import { storiesOf } from '@storybook/react-native';

import SecondaryNav, { Link } from './';


storiesOf('SecondaryNav', module)
  .add('default with back button', () => <SecondaryNav />)
  .add('custom links', () => (
    <SecondaryNav>
      <Link icon="building" label="Building" to={''} />
      <Link icon="filter" label="Filter" to={''} />
    </SecondaryNav>
  ))
  .add('custom links, no back button', () => (
    <SecondaryNav backButton={false}>
      <Link icon="building" label="Building" to={''} />
      <Link icon="filter" label="Filter" to={''} />
    </SecondaryNav>
  ));
