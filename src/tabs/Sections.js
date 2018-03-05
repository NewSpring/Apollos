import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import Hero from '@ui/Hero';
import LiveNowButton from '@ui/LiveNowButton';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import Meta from '@ui/Meta';
import styled from '@ui/styled';
import TileNav from '@ui/TileNav';
import Video from '@ui/VideoPlayer';
import withSections from '@data/withSections';
import { Right, Left, ResponsiveSideBySideView } from '@ui/SideBySideView';
import { H1 } from '@ui/typography';

// This series of flexed positioning and mediaQuery styles is incrediblely convoluted.
// TODO: consider refactor
const FixedWidthMenu = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
}));

const Flexed = styled({
  flex: 1,
});

const FlexedRight = Flexed(Right);

const Menu = compose(mediaQuery(({ md }) => ({ minWidth: md }), FixedWidthMenu, Flexed))(Left);

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

const Sections = enhance(({ isModal }) => (
  <FlexedResponsiveSideBySideView>
    <Meta title="Sections" />
    <Menu>
      <Header titleText="Sections" />
      <LiveNowButton />
      <TileNavWithSections />
    </Menu>
    {isModal ? null : (
      <MediaQuery minWidth={'md'}>
        <FlexedRight>
          <Hero background={<BackgroundVideo />}>
            <H1>Welcome to NewSpring</H1>
          </Hero>
        </FlexedRight>
      </MediaQuery>
    )}
  </FlexedResponsiveSideBySideView>
));

export default Sections;
