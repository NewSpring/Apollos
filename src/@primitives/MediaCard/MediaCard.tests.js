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
          isLight
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept a different card color', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <MediaCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          cardColor={'salmon'}
          isLight={false}
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
        <MediaCard
          title={'Boom'}
          image={'https://picsum.photos/600/400/?random'}
          category={'What'}
          style={cardDimensions}
          isLight
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
