import React from 'react';
import renderer from 'react-test-renderer';
import {
  View,
} from 'react-native';
import ThemeProvider from '../../@primitives/ThemeProvider';
import Audio from './';
import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider>
      <Audio source="https://www.w3schools.com/html/horse.mp3">
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
    </ThemeProvider>,
  );
  // expect(true).toBe(true);
  expect(tree).toMatchSnapshot();
});
