import React from 'react';
import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import TaggedContent from './';

storiesOf('TaggedContent', module)
  .add('group stories', () => (
    <FlexedView>
      <TaggedContent tagName="community" sectionTitle="You can't do life alone" />
    </FlexedView>
  ))
  .add('recent articles about giving', () => (
    <FlexedView>
      <TaggedContent tagName="giving" sectionTitle="Recent articles about giving" />
    </FlexedView>
  ));
