import React from 'react';
import { ScrollView } from 'react-native';
import { compose } from 'recompose';
import withCampuses from '@data/withCampuses';
import withGroupAttributes from '@data/withGroupAttributes';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
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
  <FlexedView>
    <Header titleText="Group Finder" />
    <LiveNowButton />
    <ScrollView>
      <PaddedView>
        <H3>Find your people</H3>
        <H6>Select your interests, campus and location to search for groups near you.</H6>
      </PaddedView>
      <PaddedView>
        <GroupSearchFormWithData
          onSubmit={(data) => {
            history.push(`/groups/finder?${stringify(data)}`);
          }}
        />
      </PaddedView>
    </ScrollView>
  </FlexedView>
));

export default Groups;
