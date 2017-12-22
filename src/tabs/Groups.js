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

const GroupSearchFormWithData = compose(
  withCampuses,
  withGroupAttributes,
)(GroupSearchForm);

export default function Groups() {
  return (
    <FlexedView>
      <Header titleText="Group Finder" />
      <ScrollView>
        <PaddedView>
          <H3>Find your people</H3>
          <H6>Select your interests, campus and location to search for groups near you.</H6>
        </PaddedView>
        <PaddedView>
          <GroupSearchFormWithData />
        </PaddedView>
      </ScrollView>
    </FlexedView>
  );
}
