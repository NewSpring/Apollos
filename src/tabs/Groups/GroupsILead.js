import React from 'react';
import withUser from '@data/withUser';
import { compose, mapProps, withProps, branch, renderNothing } from 'recompose';
import PaddedView from '@ui/PaddedView';
import { H4 } from '@ui/typography';
import ThumbnailCard from '@ui/ThumbnailCard';
import { Link } from '@ui/NativeWebRouter';
import styled from '@ui/styled';
import { RelatedContentWithoutData } from '@ui/RelatedContent';

const Title = styled({ textAlign: 'center', width: '100%' })(H4);

const isLeader = (person, leaders) =>
  person &&
  Array.isArray(leaders) &&
  leaders.length &&
  Boolean(leaders.filter(x => x.person.id === person.id).length);

const getLeaders = group =>
  group && group.members && group.members.filter(x => x.role.toLowerCase() === 'leader');

const propsReducer = ({ user, isLoading }) => {
  const groups = user && user.groups;
  const ledGroups = (groups && groups.length && user) ? groups
    .map(g => ({ ...g, members: getLeaders(g) })) // members only shows leaders
    .filter(g => isLeader(user, g.members)) // filter out groups this person isn't leading
    : [];

  return ({
    content: ledGroups,
    isLoading,
  });
};

const renderItem = item => (
  <Link to={`/groups/${item.id}`} key={item.id}>
    <ThumbnailCard
      title={item.title}
      images={item.photo}
      isLoading={item.isLoading}
    />
  </Link>
);

const GroupsILead = compose(
  withUser,
  mapProps(propsReducer),
  branch(({ isLoading, content }) => !isLoading && !content.length, renderNothing),
  withProps({
    sectionTitle: (
      <PaddedView horizontal={false}><Title>{'Groups You Lead'}</Title></PaddedView>
    ),
    renderItem,
  }),
)(RelatedContentWithoutData);

export default GroupsILead;
