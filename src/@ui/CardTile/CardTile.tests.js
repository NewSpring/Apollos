import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import CardTile from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          title={'Why Jesus is Timeless'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading skeleton', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          title={'Why Jesus is Timeless'}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a number box', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('number box should grow elegantly with larger numbers', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          number={7777}
          title={'Why Jesus is Timeless'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render card details', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render card details with date', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'} // this snapshot will expire in a year
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render children', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile>
          <Text>Biff Tannen was here</Text>
        </CardTile>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading skeleton for all available props', () => {
    const tree = renderer.create(
      <Providers>
        <CardTile
          number={7}
          title={'Why Jesus is Timeless'}
          showDetails
          byLine={'Marty McFly'}
          date={'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)'}
          isLoading
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
