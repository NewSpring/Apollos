import React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '@primitives/ThemeProvider';
import MediaCard from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <MediaCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    const tree = renderer.create(
      <ThemeProvider>
        <MediaCard style={cardDimensions} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
