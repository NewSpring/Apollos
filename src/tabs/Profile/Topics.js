import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { compose, pure } from 'recompose';
import PaddedView from '@ui/PaddedView';
import { withTheme } from '@ui/theme';
import { Switch } from '@ui/inputs';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import withTopics from '@data/withTopics';
import withUser from '@data/withUser';

const TabInfo = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.overlay,
}))(PaddedView);

const TabInfoText = styled({ textAlign: 'center' })(H7);

const SwitchRow = withTheme(({ theme }) => ({
  wrapperStyle: {
    marginVertical: 0,
    paddingVertical: theme.sizing.baseUnit / 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.shadows.default,
  },
}))(Switch);

const enhance = compose(
  pure,
  withTopics,
  withUser,
);

const Topics = enhance(({
  topics = [],
  user: { followedTopics = [] } = {},
  toggleTopic,
}) => (
  <ScrollView>
    <TabInfo>
      <TabInfoText>
        Personalize your NewSpring Home and follow the types of content you care about.
      </TabInfoText>
    </TabInfo>
    <PaddedView>
      {topics.map(topic => (
        <SwitchRow
          key={topic}
          label={topic}
          value={followedTopics.indexOf(topic) > -1}
          onValueChange={() => toggleTopic(topic)}
        />
      ))}
    </PaddedView>
  </ScrollView>
));

Topics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
  followedTopics: PropTypes.arrayOf(PropTypes.string),
  toggleTopic: PropTypes.func,
};

export default Topics;
