import React from 'react';
import { pure, compose } from 'recompose';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import Hero from '@ui/Hero';
import LiveNowButton from '@ui/LiveNowButton';
import MediaQuery from '@ui/MediaQuery';
import Meta from '@ui/Meta';
import styled from '@ui/styled';
import TileNav from '@ui/TileNav';
import Video from '@ui/VideoPlayer';
import withSections from '@data/withSections';
import { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import { H1 } from '@ui/typography';

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

const TileNavWithSections = withSections(TileNav);

const enhance = compose(pure);

// <BackgroundView>
//   <Header titleText="Sections" />
//   <LiveNowButton />
//   <TileNavWithSections />
// </BackgroundView>

const Sections = enhance(() => (
  <BackgroundView>
    <Meta title="Sections" />
    <FlexedResponsiveSideBySideView>
      <FlexedLeft>
        <Header titleText="Sections" />
        <LiveNowButton />
        <TileNavWithSections />
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

export default Sections;
