import PropTypes from 'prop-types';
import { ImagePicker as ExpoImagePicker } from 'expo';
import { compose, withProps, setPropTypes } from 'recompose';
import Touchable from '@ui/Touchable';
import { connectActionSheet } from '@ui/ActionSheet';

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
      showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      }, async (buttonIndex) => {
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
          console.log({ result });

          // todo: Result should probably be chnaged to be consistent format,
          // or just return a File Blob or something
          if (onSelectFile) onSelectFile(result);
        } catch (e) {
          console.log('image error', e);
        }
      });
    },
  })),
)(Touchable);

export default ImagePicker;
