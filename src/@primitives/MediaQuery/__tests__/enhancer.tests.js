import React from 'react';
import renderer from 'react-test-renderer';
import { View, Dimensions } from 'react-native';
import ThemeProvider from '@primitives/ThemeProvider';
import enhancer from '../enhancer';

const TestHOC = mock => (Component) => {
  mock();
  return Component;
};

describe('The mediaQuery enhancer', () => {
  it('uses the first HOC when truthful', () => {
    const firstMock = jest.fn();
    const secondMock = jest.fn();

    const Component = enhancer(() => true, TestHOC(firstMock), TestHOC(secondMock))(View);
    const tree = renderer.create(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
    expect(secondMock.mock.calls.length).toBe(0);
  });
  it('uses the second HOC when falsey', () => {
    const firstMock = jest.fn();
    const secondMock = jest.fn();

    const Component = enhancer(() => false, TestHOC(firstMock), TestHOC(secondMock))(View);
    const tree = renderer.create(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
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
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
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
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });
  it('passes in breakpoints to the test function', () => {
    const firstMock = jest.fn();

    const Component = enhancer(
      (breakpoints) => {
        expect(Object.keys(breakpoints)).toEqual(expect.arrayContaining(['xs', 'sm', 'md', 'lg']));
        return true;
      },
      TestHOC(firstMock),
    )(View);
    const tree = renderer.create(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
    expect(firstMock.mock.calls.length).toBe(1);
  });
});
