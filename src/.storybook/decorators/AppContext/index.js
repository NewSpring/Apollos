/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { nest, withProps } from 'recompose';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@ui/theme';
import FontLoader from '@ui/FontLoader';
import { Router } from '@ui/NativeWebRouter';
import { ApolloProvider } from 'react-apollo';

import Client from '@data/Client';

const Providers = nest(
  withProps({ client: Client })(ApolloProvider),
  ThemeProvider,
  FontLoader,
  Router,
);

export default function AppContent(renderStory) {
  return (
    <Providers>
      {renderStory()}
    </Providers>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
};

AppContent.defaultProps = {
  children: null,
};
