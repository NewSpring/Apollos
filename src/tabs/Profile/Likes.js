import React from 'react';
import { compose, pure } from 'recompose';
import { View } from 'react-native';
import styled from '@ui/styled';
import { withProfileLikes, withProfileRecentLikes } from '@data/likes';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import { H7 } from '@ui/typography';

const enhance = compose(
  pure,
  withProfileLikes,
);

const RecentLikesHeader = styled(({ theme }) => ({
  textAlign: 'center',
  paddingHorizontal: theme.sizing.baseUnit,
}))(H7);

const LikedContent = compose(
  styled({ backgroundColor: 'transparent' }),
)(RelatedContentWithoutData);

const RecentLikes = withProfileRecentLikes(props => (
  <View>
    <RecentLikesHeader>Check out some of the latest things from NewSpring</RecentLikesHeader>
    <LikedContent
      sectionTitle={null}
      {...props}
    />
  </View>
));

const Likes = enhance(({ content = [], isLoading, ...otherProps }) => (
  <View>
    <LikedContent
      isLoading={isLoading}
      sectionTitle={(content.length || isLoading) ? 'Your Likes' : null}
      content={content}
      {...otherProps}
    />
    {(content.length < 5) ? <RecentLikes /> : null}
  </View>
));

export default Likes;
