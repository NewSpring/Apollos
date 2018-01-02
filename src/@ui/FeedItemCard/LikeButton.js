import { TouchableOpacity } from 'react-native';
import { compose, mapProps } from 'recompose';
import withToggleLike from '@data/likes/withToggleLike';
import styled from '@ui/styled';

export const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit / 2,
}))(TouchableOpacity);

const enhance = compose(
  withToggleLike,
  mapProps(({ toggleLike, id, ...otherProps }) => ({
    onPress: () => toggleLike(id),
    ...otherProps,
  })),
);

export default enhance(LikeButton);
