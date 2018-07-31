import PropTypes from 'prop-types';
import { ImagePicker as ExpoImagePicker } from 'expo';
import { compose, withProps, setPropTypes } from 'recompose';
import { ReactNativeFile } from 'extract-files';
import Touchable from '@ui/Touchable';
import { connectActionSheet } from '@ui/ActionSheet';
import sentry from '@utils/sentry';

const ImagePicker = compose(
  setPropTypes({
    onSelectFile: PropTypes.func,
    children: PropTypes.node,
  }),
  connectActionSheet,
  withProps(({ showActionSheetWithOptions, onSelectFile }) => ({
    onPress: async () => {
      const options = ['Take Photo', 'Choose from Library', 'Cancel'];
      const cancelButtonIndex = 2;
      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => {
          let result;
          try {
            if (buttonIndex === 0) {
              result = await ExpoImagePicker.launchCameraAsync({
                mediaTypes: ['Images'],
                allowsEditing: true,
              });
            }
            if (buttonIndex === 1) {
              result = await ExpoImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
              });
            }

            // NOTE: React Native is able to polyfill
            // FormData as long as we stick to this:
            // https://github.com/facebook/react-native/blob/v0.45.1/Libraries/Network/FormData.js#L34
            // extract-files helps deal with that spec
            if (result.uri) {
              const file = new ReactNativeFile({
                uri: result.uri,
                type: 'image/jpeg',
                name: result.uri.split('/').pop(),
              });

              if (onSelectFile) onSelectFile(file);
            }
          } catch (e) {
            sentry.captureException(e);
          }
        },
      );
    },
  })),
)(Touchable);

export default ImagePicker;
