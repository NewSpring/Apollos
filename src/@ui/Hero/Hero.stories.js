import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { H1 } from '@ui/typography';
import FlexedView from '@ui/FlexedView';
import Video from '@ui/VideoPlayer';

import Hero, { BackgroundImage } from './';

const BackgroundVideo = () => (
  <Video
    src="https://s3.amazonaws.com/ns.images/newspring/fpo/HomepageVideo_ForExport_V3-Web_Hero_2_000kbps.mp4"
    posterSource="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/homepage/hero_poster_2x1_1700_850_90_c1.jpg"
    useNativeControls={false}
    shouldPlay
    isLooping
  />
);

storiesOf('Hero', module)
  .addDecorator(renderStory => (
    <FlexedView style={StyleSheet.absoluteFill}>{renderStory()}</FlexedView>
  ))
  .add('with image background', () => (
    <Hero
      brandText="My Cool Church"
      backgroundOpacity={0.5}
      background={<BackgroundImage source="https://picsum.photos/600/400/?image=63" />}
    >
      <H1>Hello!</H1>
    </Hero>
  ))
  .add('with video background', () => (
    <Hero
      brandText="My Cool Church"
      backgroundOpacity={0.5}
      background={<BackgroundVideo />}
    >
      <H1>Hello!</H1>
    </Hero>
  ))
  .add('with solid background', () => (
    <Hero
      brandText="My Cool Church"
      backgroundColor="salmon"
    >
      <H1>Hello!</H1>
    </Hero>
  ));

