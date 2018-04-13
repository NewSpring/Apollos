import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { compose, pure } from 'recompose';
import PaddedView from '@ui/PaddedView';
import { Switch } from '@ui/inputs';
import { H7 } from '@ui/typography';
import styled from '@ui/styled';
import withTopics from '@data/withTopics';
import withUser from '@data/withUser';
import TableView, { Cell, CellText, Divider } from '@ui/TableView';
import ErrorCard from '@ui/ErrorCard';

const TabInfoText = styled({ textAlign: 'center' })(H7);

const enhance = compose(
  withTopics,
  withUser,
  pure,
);

const Topics = enhance(({
  topics = [],
  error,
  user: { followedTopics = [] } = {},
  toggleTopic,
}) => (
  <ScrollView>
    {error ? <ErrorCard error={error} /> : null}
    <PaddedView>
      <TabInfoText>
        Personalize your NewSpring Home and follow the types of content you care about.
      </TabInfoText>
    </PaddedView>
    <TableView>
      {topics.map((topic, i) => [
        <Cell key={topic}>
          <CellText>{topic}</CellText>
          <Switch
            value={followedTopics.indexOf(topic) > -1}
            onValueChange={() => toggleTopic(topic)}
          />
        </Cell>,
        (i !== topics.length - 1) ? <Divider key={`${topic}-divider`} /> : null,
      ])}
    </TableView>
  </ScrollView>
));

Topics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
  followedTopics: PropTypes.arrayOf(PropTypes.string),
  toggleTopic: PropTypes.func,
};

export default Topics;
