/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ThemeProvider from '@primitives/ThemeProvider';
import FontLoader from '@primitives/FontLoader';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'salmon',
  },
});

export default function AppContent(renderStory) {
  return (
    <ThemeProvider>
      <FontLoader>
        {renderStory()}
      </FontLoader>
    </ThemeProvider>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
};

AppContent.defaultProps = {
  children: null,
};
