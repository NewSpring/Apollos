import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { TabViewPagerPan } from 'react-native-tab-view';
import { ThemeProvider } from '@ui/theme';

import TabView, { SceneMap } from './';

const FirstRoute = () => <View style={[{ flex: 1, backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[{ flex: 1, backgroundColor: '#673ab7' }]} />;

describe('TabView Component', () => {
  it('renders', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <TabView
          routes={[
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
          ]}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          renderPager={props => <TabViewPagerPan {...props} />}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
