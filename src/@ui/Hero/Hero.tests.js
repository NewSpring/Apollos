import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import { H1 } from '@ui/typography';

import Hero, { BackgroundImage } from './';

describe('The Hero component', () => {
  it('should render with background image', () => {
    const tree = renderer.create(
      <Providers>
        <Hero
          brandText="My Cool Church"
          backgroundOpacity={0.5}
          background={<BackgroundImage source="https://picsum.photos/600/400/?image=63" />}
        >
          <H1>Hello!</H1>
        </Hero>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with arbitrary background', () => {
    const tree = renderer.create(
      <Providers>
        <Hero
          background={<H1>This would be dumb, but should work fine!</H1>}
        >
          <H1>Hello!</H1>
        </Hero>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with solid background', () => {
    const tree = renderer.create(
      <Providers>
        <Hero
          brandText="My Cool Church"
          backgroundColor="salmon"
        >
          <H1>Hello!</H1>
        </Hero>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
