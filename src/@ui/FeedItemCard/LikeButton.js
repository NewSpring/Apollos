import { TouchableOpacity } from 'react-native';
import { compose, mapProps } from 'recompose';
import withToggleLike from '@data/likes/withToggleLike';

const enhance = compose(
  withToggleLike,
  mapProps(({ toggleLike, id, ...otherProps }) => ({
    onPress: () => toggleLike(id),
    ...otherProps,
  })),
);

export default enhance(TouchableOpacity);
