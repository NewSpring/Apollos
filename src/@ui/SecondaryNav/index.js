import React from 'react';
import PropTypes from 'prop-types';
import { withProps, compose } from 'recompose';
import withToggleLike from '@data/likes/withToggleLike';
import TabBar, { Link } from '@ui/TabBar';
import { share } from '@utils/content';

export { Link };

export const Share = withProps(({ content }) => ({
  icon: 'share',
  onPress: () => share(content),
}))(Link);

export const Like = compose(
  withToggleLike,
  withProps(({ toggleLike, id, isLiked }) => ({
    onPress: () => toggleLike(id),
    icon: isLiked ? 'like-solid' : 'like',
  })),
)(Link);

const SecondaryNav = ({
  backButton = false,
  backButtonIcon = 'arrow-back',
  backTo,
  onBackPress,
  children,
  onBackReplace,
  isLoading = false,
}) =>
  (!isLoading ? (
    <TabBar>
      {backButton ? (
        <Link pop to={backTo} icon={backButtonIcon} onPress={onBackPress} replace={onBackReplace} />
      ) : null}
      {children}
    </TabBar>
  ) : null);

SecondaryNav.propTypes = {
  backButton: PropTypes.bool,
  backButtonIcon: PropTypes.string,
  children: PropTypes.node,
  onBackPress: PropTypes.func,
  backTo: PropTypes.string,
  onBackReplace: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default SecondaryNav;
