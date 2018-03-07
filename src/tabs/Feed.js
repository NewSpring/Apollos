import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withHomeFeed from '@data/withHomeFeed';
import LiveNowButton from '@ui/LiveNowButton';
import { withTheme } from '@ui/theme';
import Video from '@ui/VideoPlayer';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import styled from '@ui/styled';
import MediaQuery from '@ui/MediaQuery';
import Hero from '@ui/Hero';
import Meta from '@ui/Meta';
import { H1 } from '@ui/typography';

const FeedViewWithHomeFeed = withHomeFeed(FeedView);

const enhance = compose(
  pure,
  withTheme(({ theme: { web: { backgroundVideo, backgroundVideoThumbnail = {} } = {} } = {} }) => ({
    webBackgroundSource: backgroundVideo,
    webBackgroundThumbnail: backgroundVideoThumbnail,
  })),
);

const flexed = styled({ flex: 1 });
const FlexedLeft = flexed(Left);
const FlexedResponsiveSideBySideView = flexed(ResponsiveSideBySideView);

export const Feed = enhance(({ webBackgroundSource, webBackgroundThumbnail }) => (
  <BackgroundView>
    <Meta title="Welcome" />
    <FlexedResponsiveSideBySideView>
      <FlexedLeft>
        <Header titleText="NewSpring Church" />
        <LiveNowButton />
        <FeedViewWithHomeFeed />
      </FlexedLeft>
      <MediaQuery minWidth="lg">
        <Right>
          <Hero
            background={
              <Video
                src={webBackgroundSource}
                posterSrc={webBackgroundThumbnail}
                useNativeControls={false}
                shouldPlay
                isLooping
              />
            }
          >
            <H1>Welcome to NewSpring</H1>
          </Hero>
        </Right>
      </MediaQuery>
    </FlexedResponsiveSideBySideView>
  </BackgroundView>
));

export default Feed;
