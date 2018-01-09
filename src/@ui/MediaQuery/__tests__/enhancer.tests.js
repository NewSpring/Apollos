import React from 'react';
import renderer from 'react-test-renderer';
import { View, Dimensions } from 'react-native';
import Providers from '@ui/TestProviders';
import { DEFAULT_THEME } from '@ui/constants';
import enhancer from '../enhancer';

const TestHOC = mock => (Component) => {
  mock();
  return Component;
};

const mediaQueryThatPasses = () => true;
const mediaQueryThatFails = () => false;

describe('The mediaQuery enhancer', () => {
  it('uses the first HOC (and renders the root View) with a passing media query', () => {
    const firstMock = jest.fn();
    const secondMock = jest.fn();

    const Component = enhancer(mediaQueryThatPasses, TestHOC(firstMock), TestHOC(secondMock))(View);
    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
    expect(secondMock.mock.calls.length).toBe(0);
  });
  it('uses the second HOC (and renders the root View) with a failing media query', () => {
    const firstMock = jest.fn();
    const secondMock = jest.fn();

    const Component = enhancer(mediaQueryThatFails, TestHOC(firstMock), TestHOC(secondMock))(View);
    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(0);
    expect(secondMock.mock.calls.length).toBe(1);
  });

  const testWindow = Dimensions.get('window');
  it('works with a simple media query', () => {
    const firstMock = jest.fn();

    const Component = enhancer(
      () => ({ maxWidth: testWindow.width + 1 }),
      TestHOC(firstMock),
    )(View);

    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });

  it('works with a complex media query', () => {
    const firstMock = jest.fn();

    const Component = enhancer(
      () => ({
        maxWidth: testWindow.width + 1,
        minWidth: testWindow.width - 1,
        maxHeight: testWindow.height + 1,
        minHeight: testWindow.height - 1,
        minDeviceAspectRatio: (testWindow.width / testWindow.height) - 1,
        maxDeviceAspectRatio: (testWindow.width / testWindow.height) + 1,
      }),
      TestHOC(firstMock),
    )(View);

    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });

  it('uses second HOC when provided with a complex media query that doesnt match', () => {
    const firstMock = jest.fn();
    const secondMock = jest.fn();

    const Component = enhancer(
      () => ({
        maxWidth: testWindow.width - 1,
        minWidth: testWindow.width + 1,
        maxHeight: testWindow.height - 1,
        minHeight: testWindow.height + 1,
        minDeviceAspectRatio: (testWindow.width / testWindow.height) + 1,
        maxDeviceAspectRatio: (testWindow.width / testWindow.height) - 1,
      }),
      TestHOC(firstMock),
      TestHOC(secondMock),
    )(View);

    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(0);
    expect(secondMock.mock.calls.length).toBe(1);
  });

  it('passes in breakpoints to the test function', () => {
    const firstMock = jest.fn();

    const testFunction = ({ height, width, ...breakpoints }) => {
      expect(breakpoints).toEqual(DEFAULT_THEME.breakpoints);
      return true;
    };

    const Component = enhancer(testFunction, TestHOC(firstMock))(View);

    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });

  it('passes in window width and height to the test function', () => {
    const firstMock = jest.fn();

    const testFunction = ({ height, width }) => {
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      return true;
    };

    const Component = enhancer(testFunction, TestHOC(firstMock))(View);

    const tree = renderer.create(
      <Providers>
        <Component />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });
});
