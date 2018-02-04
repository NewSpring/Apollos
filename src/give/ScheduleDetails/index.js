import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';

import RecentArticles from 'give/RecentArticles';
import Schedule from './Schedule';

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
);

const ScheduleDetails = enhance(({ id }) => (
  <BackgroundView>
    <Header
      titleText={Platform.OS !== 'web' ? 'Schedule' : null}
      backButton
      webEnabled
    />
    <ScrollView>
      <Schedule id={id} />
      <RecentArticles />
    </ScrollView>
  </BackgroundView>
));

export default ScheduleDetails;
