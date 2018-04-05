import { Platform } from 'react-native';
import ConnectedImage from '@ui/ConnectedImage';
import styled from '@ui/styled';

const NavItemImage = styled({
  aspectRatio: 1,
  width: '100%',
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '100%',
    },
  }),
})(ConnectedImage);

NavItemImage.propTypes = ConnectedImage.propTypes;
export default NavItemImage;
