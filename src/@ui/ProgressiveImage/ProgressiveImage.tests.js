import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import ProgressiveImage from './';

describe('the ProgressiveImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ProgressiveImage
          source={{
            uri: 'https://placeholdit.co/i/1500x1500',
            width: 1500,
            height: 1500,
          }}
          thumbnail={{
            uri: 'https://placeholdit.co/i/50x50',
            width: 50,
            height: 50,
          }}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
