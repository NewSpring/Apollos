import React from 'react';

import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import UserAvatarView from './';

const photo = { url: 'https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/members.nophoto_1000_1000_90_c1.jpg' };

storiesOf('UserAvatarView', module)
  .add('default', () => (
    <FlexedView>
      <UserAvatarView
        photo={photo}
        firstName="John"
        lastName="Doe"
        city="Hometown"
      />
    </FlexedView>
  ));

