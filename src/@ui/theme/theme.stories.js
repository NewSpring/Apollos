import React from 'react';

import { storiesOf } from '@storybook/react-native';

import FlexedView from '@ui/FlexedView';
import { H3, H7, BodyCopy } from '@ui/typography';
import { ThemeProvider, ThemeMixin, withThemeMixin } from './';

const TypeExample = () => (
  <FlexedView>
    <H3>Hi there!</H3>
    <H7>Lorem ipsum dolor sit amet.</H7>
    <BodyCopy>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales sit amet ante eu
      lobortis. In vitae faucibus lectus, at interdum nibh. Fusce suscipit tincidunt justo, vitae
      cursus mi fermentum eget.
    </BodyCopy>
  </FlexedView>
);

const DarkTypeExample = withThemeMixin({
  colors: { palette: 'dark' },
})(TypeExample);

const TypeExampleWithProps = withThemeMixin(({ color, isLight = true }) => ({
  colors: {
    palette: isLight ? 'light' : 'dark',
    common: {
      primary: color,
    },
  },
}))(TypeExample);

storiesOf('Theming', module)
  .add('ThemeProvider - default', () => (
    <ThemeProvider>
      <TypeExample />
    </ThemeProvider>
  ))
  .add('ThemeProvider - dark theme', () => (
    <ThemeProvider
      themeInput={{
        colors: {
          palette: 'dark',
        },
      }}
    >
      <TypeExample />
    </ThemeProvider>
  ))
  .add('ThemeMixin', () => (
    <ThemeProvider>
      <FlexedView>
        <TypeExample />
        <ThemeMixin mixin={{ colors: { palette: 'dark' } }}>
          <TypeExample />
        </ThemeMixin>
      </FlexedView>
    </ThemeProvider>
  ))
  .add('withThemeMixin', () => (
    <ThemeProvider>
      <FlexedView>
        <TypeExample />
        <DarkTypeExample />
      </FlexedView>
    </ThemeProvider>
  ))
  .add('withThemeMixin using props', () => (
    <ThemeProvider>
      <FlexedView>
        <TypeExampleWithProps isLight color="red" />
        <TypeExampleWithProps isLight={false} color="blue" />
      </FlexedView>
    </ThemeProvider>
  ));

