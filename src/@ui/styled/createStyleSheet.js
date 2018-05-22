import { StyleSheet } from 'react-native';
import { flatten } from 'lodash';

export const cachedStyles = {};
export const styleHasher = JSON.stringify; // todo: how bad is this?

// Uses cached or generates a new StyleSheet for a given style prop
const createStyleSheet = (stylesToGenerate) => {
  let styles = flatten([stylesToGenerate]); // Need to make sure we're working with a flat array
  const styleSheet = {}; // passed to StyleSheet.create later

  // Load style from cache or add style to stylesheet
  styles.forEach((style, index) => {
    if (typeof style !== 'object' || !style) return;
    const hash = styleHasher(style);
    if (cachedStyles[hash]) {
      styles[index] = cachedStyles[hash];
    } else {
      styleSheet[`${index}`] = style;
    }
  });

  if (Object.keys(styleSheet).length) {
    // Generate the new stylesheet
    const generatedStyleSheet = StyleSheet.create(styleSheet);

    // Process the generated stylesheet
    Object.keys(generatedStyleSheet).forEach((key) => {
      const index = parseInt(key, 0);
      const generatedStyle = generatedStyleSheet[key];
      const hash = styleHasher(styles[index]);

      // add generated style to cache
      cachedStyles[hash] = generatedStyle;

      // swap generated style into result list
      styles[index] = generatedStyle;
    });
  }

  if (styles.length === 1) styles = styles[0]; // eslint-disable-line
  return styles;
};

export default createStyleSheet;
