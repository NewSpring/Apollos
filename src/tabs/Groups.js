import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { compose } from 'recompose';
import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import { H3, H6 } from '@ui/typography';
import { GroupSearchForm } from '@ui/forms';
import { withRouter } from '@ui/NativeWebRouter';
import LiveNowButton from '@ui/LiveNowButton';
import { stringify } from '@utils/queryString';

const GroupSearchFormWithData = compose(
  withCampuses,
  withGroupAttributes,
)(GroupSearchForm);

const Groups = withRouter(({
  history,
}) => (
  <BackgroundView>
    <Header webEnabled titleText={Platform.OS === 'web' ? 'Find your people' : 'Group Finder'}>
      {Platform.OS === 'web' ? <H6>Select your interests, campus and location to search for groups near you.</H6> : null}
    </Header>
    <LiveNowButton />
    <ScrollView>
      {Platform.OS !== 'web' ? (
        <PaddedView>
          <H3>Find your people</H3>
          <H6>Select your interests, campus and location to search for groups near you.</H6>
        </PaddedView>
      ) : null}
      <PaddedView horizontal={false}>
        <GroupSearchFormWithData
          onSubmit={(data) => {
            history.push(`/groups/finder?${stringify(data)}`);
          }}
        />
      </PaddedView>
    </ScrollView>
  </BackgroundView>
));

export default Groups;
