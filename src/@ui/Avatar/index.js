import { get } from 'lodash';
import ConnectedImage from '@ui/ConnectedImage';
import styled from '@ui/styled';

export { default as AvatarList } from './List';

const Avatar = styled(({ theme, size }) => {
  const themeSize = get(theme.sizing.avatar, size, theme.sizing.avatar.small);
  return {
    width: themeSize,
    height: themeSize,
    borderRadius: themeSize / 2,
    marginRight: themeSize / 4,
    marginBottom: themeSize / 4,
    overflow: 'hidden',
  };
}, 'Avatar')(ConnectedImage);

export default Avatar;
