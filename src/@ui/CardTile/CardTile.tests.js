import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import CardTile from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading skeleton', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
          isLoading
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('number box should grow elegantly with larger numbers', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7777}
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'3mo'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should not render a number box if prop is missing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          title={'Sermon Title'}
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
