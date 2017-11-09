/* eslint-disable */
import React from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import { compose, mapProps } from 'recompose';
import Header from '@modules/Header';
import FooterNav from '@modules/FooterNav';
import H1 from '@primitives/H1';
import Umbrella from '@primitives/icons/Umbrella';
import { Desktop, Mobile } from '@primitives/MediaQuery';
import Audio from '@modules/Audio';
import Play from '@primitives/icons/Play';
import Pause from '@primitives/icons/Pause';
import withHomeFeed from '@data/withHomeFeed';
import withMediaPlayer from '@data/withMediaPlayer';

export function Feed(props) {
  console.log(props);
  return (
    <View>
      <Header titleText="NewSpring Church" />
      <Desktop>
        <H1>{'A title'}</H1>
      </Desktop>
      <Mobile>
        <Umbrella />
      </Mobile>

      <Audio
        source="https://www.w3schools.com/html/horse.mp3"
      >
        <Audio.Play>
          <View>
            <Play />
          </View>
        </Audio.Play>

        <Audio.Pause>
          <View>
            <Pause />
          </View>
        </Audio.Pause>

        <Audio.Seeker />
      </Audio>

      <TouchableHighlight onPress={props.play.bind(this, { id: 'someid' })}>
        <View>
          <Play />
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={props.pause}>
        <View>
          <Pause />
        </View>
      </TouchableHighlight>


      <FooterNav>
        <FooterNav.Link
          to="/sections"
          label="sections"
          activeStyle={{ backgroundColor: 'red' }}
        />
        <FooterNav.Link
          to="/"
          label="feed"
          activeStyle={{ backgroundColor: 'red' }}
        />
      </FooterNav>
    </View>
  );
}

const enhance = compose(
  withHomeFeed,
  mapProps(({ data: { feed } }) => ({ feed })),
  withMediaPlayer,
);

export default enhance(Feed);
