import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';
import { View } from 'react-native';

import Button from './';

describe('The Button component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <Button title="My Button!" onPress={() => {}} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as default type', () => {
    const tree = renderer.create(
      <Providers>
        <Button title="My Button!" type="default" onPress={() => {}} />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a primary button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Primary Action"
          type="primary"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a secondary button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Secondary Action"
          type="secondary"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a Tertiary button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Tertiary Action"
          type="tertiary"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a disabled button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Disabled Button 😭"
          disabled
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a ghost button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Ghost Button"
          bordered
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a pill button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Ghost Button"
          pill
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a pill button', () => {
    const tree = renderer.create(
      <Providers>
        <Button
          onPress={() => {}}
          title="Ghost Button"
          bordered
          pill
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with children', () => {
    const tree = renderer.create(
      <Providers>
        <Button>
          <View />
        </Button>
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
