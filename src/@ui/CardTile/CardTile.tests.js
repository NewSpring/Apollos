import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';
import CardTile from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          title={'Why Jesus is Timeless'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading skeleton', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          title={'Why Jesus is Timeless'}
          isLoading
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a number box', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
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
          title={'Why Jesus is Timeless'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render card details', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render card details with date', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'} // this snapshot will expire in a year
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading skeleton for all available props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
          isLoading
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
