import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import BackgroundView from '@ui/BackgroundView';
import withHomeFeed from '@data/withHomeFeed';
import LiveNowButton from '@ui/LiveNowButton';
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
);

const FlexedLeft = styled({ flex: 1 })(Left);
const FlexedResponsiveSideBySideView = styled({ flex: 1 })(ResponsiveSideBySideView);

const BackgroundVideo = () => (
  <Video
    src="https://s3.amazonaws.com/ns.images/newspring/fpo/HomepageVideo_ForExport_V3-Web_Hero_2_000kbps.mp4"
    posterSource="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/hero_poster_2x1_1700_850_90_c1.jpg"
    useNativeControls={false}
    shouldPlay
    isLooping
  />
);

export const Feed = enhance(() => (
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
          <Hero background={<BackgroundVideo />}>
            <H1>Welcome to NewSpring</H1>
          </Hero>
        </Right>
      </MediaQuery>
    </FlexedResponsiveSideBySideView>
  </BackgroundView>
));

export default Feed;
