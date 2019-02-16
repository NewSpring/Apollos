// see https://github.com/react-native-web-community/react-native-web-maps
import MapView from 'react-native-web-maps';
import { withProps } from 'recompose';
import { Marker as RGMMArker } from 'react-google-maps';

const iconURL = require('./icon.png');

// polyfill for onPress support
const Marker = withProps(({ onPress, coordinate }) => ({
  position: { lat: coordinate.latitude, lng: coordinate.longitude },
  icon: { url: iconURL },
  onClick: onPress,
}))(RGMMArker);

MapView.Marker = Marker; // to keep api compatibility with Expo vs export { Marker }

export default MapView;
