import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import MediaQuery from '@ui/MediaQuery';
import Hero, { BackgroundImage } from '@ui/Hero';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import styled from '@ui/styled';

import RecentArticles from 'give/RecentArticles';
import Schedule from './Schedule';
import Banner from '../detail-hero.jpg';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);


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
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header
          titleText={Platform.OS !== 'web' ? 'Schedule' : null}
          backButton
          webEnabled
        />
        <ScrollView>
          <Schedule id={id} />
          <RecentArticles />
        </ScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={Banner} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

export default ScheduleDetails;
