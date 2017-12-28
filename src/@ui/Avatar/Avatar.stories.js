import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import Avatar from './';

const source = { url: 'https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/members.nophoto_1000_1000_90_c1.jpg' };

storiesOf('Avatar', module)
  .add('default', () => (
    <FlexedView style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
      <Avatar
        source={source}
        size="small"
      />
      <Avatar
        source={source}
        size="medium"
      />
      <Avatar
        source={source}
        size="large"
      />
    </FlexedView>
  ));

