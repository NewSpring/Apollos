import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import Providers from '@ui/TestProviders';
import Icon from '@ui/Icon';
import Audio from './';

it('renders correctly', () => {
  const tree = renderer.create(
    <Providers>
      <Audio source="https://www.w3schools.com/html/horse.mp3">
        <Audio.Play>
          <View>
            <Icon name="play" />
          </View>
        </Audio.Play>

        <Audio.Pause>
          <View>
            <Icon name="pause" />
          </View>
        </Audio.Pause>

        <Audio.Seeker />
      </Audio>
    </Providers>,
  );
  // expect(true).toBe(true);
  expect(tree).toMatchSnapshot();
});
