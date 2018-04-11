import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Platform } from 'react-native';
import { compose, mapProps, pure } from 'recompose';

import withGroupInfo from '@data/withGroupInfo';
import Header from '@ui/Header';
import ProgressiveImage from '@ui/ProgressiveImage';
import PaddedView from '@ui/PaddedView';
import BackgroundView from '@ui/BackgroundView';
import Card from '@ui/Card';
import { H3, H4, H5, H6, H7, BodyText } from '@ui/typography';
import styled from '@ui/styled';
import Avatar, { AvatarList } from '@ui/Avatar';
import Button from '@ui/Button';
import Chip, { ChipList } from '@ui/Chip';
import SideBySideView, { ResponsiveSideBySideView, Left, Right } from '@ui/SideBySideView';
import { Link } from '@ui/NativeWebRouter';
import Settings from '@utils/Settings';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import Meta from '@ui/Meta';
import WebBrowser from '@ui/WebBrowser';

import Map from './Map';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const rockUrl = Settings.APP_ROCK_URL || 'https://rock.newspring.cc/'; // todo

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withGroupInfo,
);

const ShareLink = compose(
  withGroupInfo,
  mapProps(({ group } = {}) => ({ content: group })),
)(Share);

const StyledImage = styled({
  width: '100%',
  aspectRatio: 2,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(ProgressiveImage);

const Label = styled(({ theme }) => ({ color: theme.colors.text.tertiary }))(H7);
const Info = styled(({ theme }) => ({ color: theme.colors.text.secondary }))(H6);
const AdTitle = styled({ textAlign: 'center' })(H4);

const GroupInfoContainer = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const CenteredSideBySideView = styled({
  alignItems: 'center',
})(ResponsiveSideBySideView);

const GroupFindCTA = styled({
  alignItems: 'center',
})(PaddedView);

const leadersLoadingState = [{
  person: {
    id: 'loading',
    photo: null,
  },
}];

const GroupInfo = ({ label, info }) => (
  <GroupInfoContainer>
    <Label>{label}</Label>
    <Info>{info}</Info>
  </GroupInfoContainer>
);

GroupInfo.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
};

const isCurrentPersonLeader = (person, leaders) =>
  person && Array.isArray(leaders) && leaders.filter(x => x.person.id === person.id).length;

const GroupSingle = enhance(({
  id,
  group: {
    photo = null,
    name,
    // name
    guid,
    entityId,
    type,
    demographic,
    description,
    kidFriendly,
    ageRange,
    campus = {},
    tags = [],
    locations = [], // { location { city, state, latitude, longitude } }
    // schedule { description }
    members = [], // {
    //   role
    //   person { id, photo, firstName, nickName, lastName }
    // }
    // groupType
    isLiked,
  } = {},
  person,
  isLoading,
}) => {
  const leaders = members.filter(x => x.role.toLowerCase() === 'leader');
  const loginParam = person ? person.impersonationParameter : '';
  const isLeader = isCurrentPersonLeader(person, leaders);
  return (
    <BackgroundView>
      <Meta title={name} image={photo} description={description} id={id} />
      <Header titleText="Group Profile" backButton />
      <FlexedSideBySideView>
        <FlexedLeft>
          <ScrollView>
            <StyledImage source={{ url: photo }} />
            <Card isLoading={isLoading}>
              <PaddedView>
                <H3>{name}</H3>
              </PaddedView>
              <PaddedView vertical={false}>
                <Label>Group Leaders</Label>
                <H5>{leaders.map(leader => `${leader.person.firstName} ${leader.person.lastName}`).join(', ')}</H5>
                <AvatarList>
                  {(isLoading ? leadersLoadingState : leaders).map(leader => (
                    <Avatar key={leader.person.id} source={{ url: leader.person.photo }} size="medium" />
                  ))}
                </AvatarList>
              </PaddedView>
            </Card>

            <Card isLoading={isLoading}>
              <PaddedView>
                <CenteredSideBySideView>
                  <AdTitle>#TheseAreMyPeople</AdTitle>
                  {isLeader ? (
                    <Button title="Manage" bordered onPress={() => WebBrowser.openBrowserAsync(`${rockUrl}page/521?GroupId=${entityId}&${loginParam}`)} />
                  ) : (
                    <Button title="Contact" bordered onPress={() => WebBrowser.openBrowserAsync(`${rockUrl}Workflows/304?Group=${guid}${loginParam}`)} />
                  )}
                </CenteredSideBySideView>
              </PaddedView>
            </Card>

            <Card isLoading={isLoading}>
              <PaddedView>
                <H5>Group Details</H5>
                {(() => {
                  const loc = locations[0];
                  if (!loc) return null;
                  return <GroupInfo label="Address" info={`${loc.location.city}, ${loc.location.state}`} />;
                })()}
                {(() => {
                  if (!campus || !campus.name) return null;
                  return <GroupInfo label="Campus" info={campus.name} />;
                })()}
                {(() => {
                  let info = kidFriendly ? 'Children Welcome' : 'Adults Only';
                  if (ageRange) info += `, ${ageRange[0]} - ${ageRange[1]}`;
                  return <GroupInfo label="Information" info={info} />;
                })()}
              </PaddedView>
            </Card>

            <Card isLoading={isLoading}>
              <PaddedView>
                <H5>More Information</H5>
                <GroupInfoContainer>
                  <Label>Description</Label>
                  <BodyText>{description}</BodyText>
                </GroupInfoContainer>

                <GroupInfoContainer>
                  <Label>Members</Label>
                  <AvatarList>
                    {members.filter(x => x.person && x.person.photo).map(member => (
                      <Avatar key={member.person.id} source={{ url: member.person.photo }} size="small" />
                    ))}
                  </AvatarList>
                </GroupInfoContainer>

                <GroupInfoContainer>
                  <Label>Tags</Label>
                  <ChipList>
                    {tags.map(tag => (
                      <Chip key={tag.id} title={tag.value} />
                    ))}
                    {(() => {
                      if (!type || type === 'Interests') return null;
                      return <Chip title={type} />;
                    })()}
                    {(() => {
                      if (!kidFriendly) return null;
                      return <Chip title={'Kid Friendly'} />;
                    })()}
                    {(() => {
                      if (!demographic) return null;
                      return <Chip title={demographic} />;
                    })()}
                  </ChipList>
                </GroupInfoContainer>
              </PaddedView>
            </Card>

            <Card>
              <GroupFindCTA>
                <AdTitle>Looking for another group?</AdTitle>
                <Link component={Button} to="/groups" pop title="Find A Group" type="default" />
              </GroupFindCTA>
            </Card>
          </ScrollView>
        </FlexedLeft>
        {Platform.OS === 'web' ? (
          <MediaQuery minWidth="md">
            <Right>
              <Map
                groups={[{
                  locations,
                  id,
                }]}
                linkToGroup={false}
              />
            </Right>
          </MediaQuery>
        ) : null}
      </FlexedSideBySideView>
      <MediaQuery maxWidth="md">
        <SecondaryNav>
          <ShareLink id={id} />
          <Like id={id} isLiked={isLiked} />
        </SecondaryNav>
      </MediaQuery>
    </BackgroundView>
  );
});

export default GroupSingle;
