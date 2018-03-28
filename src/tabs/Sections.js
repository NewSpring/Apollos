import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { Right, Left, ResponsiveSideBySideView } from '@ui/SideBySideView';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import withSections from '@data/withSections';
import TileNav from '@ui/TileNav';
import Header from '@ui/Header';
import Meta from '@ui/Meta';
import LiveNowButton from '@ui/LiveNowButton';
import Hero from '@ui/Hero';
import Video from '@ui/VideoPlayer';
import { H1 } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    webBackgroundSource: PropTypes.string,
    webBackgroundThumbnail: PropTypes.string,
    isModal: PropTypes.bool,
  }),
  withTheme(({ theme: { web: { backgroundVideo, backgroundVideoThumbnail = {} } = {} } = {} }) => ({
    webBackgroundSource: backgroundVideo,
    webBackgroundThumbnail: backgroundVideoThumbnail,
  })),
);

// This series of flexed positioning and mediaQuery styles is incrediblely convoluted.
// TODO: consider refactor
const flexed = styled({
  flex: 1,
});
const FlexedRight = flexed(Right);
const FlexedResponsiveSideBySideView = flexed(ResponsiveSideBySideView);

const fixedWidthMenu = styled(({ theme }) => ({
  maxWidth: theme.breakpoints.sm,
  flex: 1,
}));
const Menu = compose(mediaQuery(({ md }) => ({ minWidth: md }), fixedWidthMenu, flexed))(Left);

const TileNavWithSections = withSections(TileNav);

const Sections = enhance(({ isModal, webBackgroundSource, webBackgroundThumbnail }) => (
  <FlexedResponsiveSideBySideView>
    <Meta title="Sections" />
    <Menu>
      <Header titleText="Sections" />
      <LiveNowButton />
      <TileNavWithSections testID="tileSection" />
    </Menu>
    {isModal ? null : (
      <MediaQuery minWidth={'md'}>
        <FlexedRight>
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
        </FlexedRight>
      </MediaQuery>
    )}
  </FlexedResponsiveSideBySideView>
));

export default Sections;
