import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compose, withProps } from 'recompose';
import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
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
    italic: true,
    children: 'Select your interests, campus and location to search for groups near you.',
  }),
)(H7);

const Groups = withRouter(({
  history,
}) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header webEnabled titleText={Platform.OS === 'web' ? 'Find your people' : 'Group Finder'} >
          {Platform.OS === 'web' ? <Instructions /> : null}
        </Header>
        <LiveNowButton />
        <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled">
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
