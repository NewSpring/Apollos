import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import styled from '@ui/styled';
import { UIText } from '@ui/typography';

import ArrowBackButton from 'give/ArrowBackButton';
import RecentArticles from 'give/RecentArticles';
import Schedule from './Schedule';

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  padding: theme.sizing.baseUnit / 2,
}), 'BackgroundView')(View);

const Note = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
  textAlign: 'center',
  color: theme.colors.text.secondary,
}))(UIText);

class ScheduleDetails extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    goBack: PropTypes.func,
  };

  static defaultProps = {
    id: undefined,
    goBack() {},
  };

  render() {
    return (
      <ScrollView>
        <PaperView>
          <Header
            titleText="Schedule"
            backButton
          />

          <ArrowBackButton
            onPress={this.props.goBack}
          />

          <Schedule
            id={this.props.id}
          />

          <Note>
            {'To change details about a schedule, please cancel the current one and create a new schedule with the desired information. We are sorry for any inconvenience this may cause and are working to provide the ability to edit contribution schedules in the future.'}
          </Note>
        </PaperView>
        <BackgroundView>
          <RecentArticles />
        </BackgroundView>
      </ScrollView>
    );
  }
}

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
);

export default enhance(ScheduleDetails);
