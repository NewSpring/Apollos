import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from '@ui/styled';

// Finds the angle between two points (in radians)
// Ex: getAngle([0,0],[0,1]) ~= 1.57rad or 90deg
const getAngle = ([startX, startY], [endX, endY]) => (
  Math.atan2(
    endY - startY,
    endX - startX,
  ) + (90 * (Math.PI / 180)) // need to rotate 90 degrees for CSS
);

// transates in array of colors and locations to CSS color-stops
const getColorStops = ({ colors, locations }) => colors.map((color, index) => (
  `${color}${locations[index] ? ` ${locations[index] * 100}%` : ''}`
));

/**
 * Provides an API-compatible web-port of the LinearGradient component
 */
const LinearGradient = styled(({
  colors = [],
  start = [0, 0],
  end = [0, 1],
  locations = [],
}) => ({
  backgroundImage: `linear-gradient(
    ${getAngle(start, end)}rad,
    ${getColorStops({ colors, locations }).join(', ')}
  )`,
}))(View);

LinearGradient.propTypes = {
  /**
   * An array of colors that represent stops in the gradient. At least two colors are required
   * (otherwise it’s not a gradient, it’s just a fill!).
   */
  colors: PropTypes.arrayOf(PropTypes.string),

  /**
   * An array of [x, y] where x and y are floats. They represent the position that the gradient
   * starts at, as a fraction of the overall size of the gradient. For example, [0.1, 0.1] means
   * that the gradient will start 10% from the top and 10% from the left.
   */
  start: PropTypes.arrayOf(PropTypes.number),

  /**
   * Same as start but for the end of the gradient.
   */
  end: PropTypes.arrayOf(PropTypes.number),

  /**
   * An array of the same lenth as colors, where each element is a float with the same meaning
   * as the start and end values, but instead they indicate where the color at that index should be.
   */
  locations: PropTypes.arrayOf(PropTypes.number),
};

export default LinearGradient;
