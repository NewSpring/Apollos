import React from 'react';
import { Platform } from 'react-native';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import { compose, withProps } from 'recompose';
import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import Meta from '@ui/Meta';
import { H3, H7 } from '@ui/typography';
import { GroupSearchForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';
import LiveNowButton from '@ui/LiveNowButton';
import { stringify } from '@utils/queryString';
import MediaQuery from '@ui/MediaQuery';
import { ResponsiveSideBySideView as SideBySideView, Left, Right } from '@ui/SideBySideView';
import Hero, { BackgroundImage } from '@ui/Hero';
import styled from '@ui/styled';

import GroupStories from './GroupStories';
import GroupsILead from './GroupsILead';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const GroupSearchFormWithData = compose(
  withCampuses,
  withGroupAttributes,
)(GroupSearchForm);

const Instructions = compose(
  styled(({ theme }) => ({ color: theme.colors.text.tertiary })),
  withProps({
    children: 'Select your interests, campus and location to search for groups near you.',
  }),
)(H7);

const Groups = withRouter(({
  history,
}) => (
  <BackgroundView>
    <Meta
      title="Group Finder"
      description="Who are your people? We know it's important to be connected, but it's hard to build lasting friendships. What if taking one simple step changed everything? At NewSpring, we’re trying to make it easier for you to find people who share your interests. We know that when you get together with people and have fun, you’ll begin to grow into a strong community that serves and grows together. What if you are one step away from saying, “These are my people”?"
      image="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_2000_1000_90_a789ae07aae81961.jpg"
    />
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header webEnabled titleText={Platform.OS === 'web' ? 'Find your people' : 'Group Finder'} >
          {Platform.OS === 'web' ? <Instructions /> : null}
        </Header>
        <LiveNowButton />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          {Platform.OS !== 'web' ? (
            <PaddedView>
              <H3>Find your people</H3>
              <Instructions />
            </PaddedView>
          ) : null}
          <PaddedView horizontal={false}>
            <GroupSearchFormWithData
              onSubmit={(data) => {
                history.push(`/groups/finder?${stringify(data)}`);
              }}
            />
          </PaddedView>
          <GroupsILead />
          <GroupStories tagName="community" sectionTitle="You can't do life alone" />
        </KeyboardAwareScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={require('./groups.camping.jpg')} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

export default Groups;
