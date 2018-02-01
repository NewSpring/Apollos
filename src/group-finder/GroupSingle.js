import React from 'react';
import PropTypes from 'prop-types';
import { Linking, ScrollView, View, Platform } from 'react-native';
import { compose, mapProps, pure } from 'recompose';

import withGroupInfo from '@data/withGroupInfo';
import Header from '@ui/Header';
import ConnectedImage from '@ui/ConnectedImage';
import PaddedView from '@ui/PaddedView';
import BackgroundView from '@ui/BackgroundView';
import Card from '@ui/Card';
import { H3, H4, H5, H6, H7, BodyText } from '@ui/typography';
import styled from '@ui/styled';
import Avatar, { AvatarList } from '@ui/Avatar';
import Button from '@ui/Button';
import Chip, { ChipList } from '@ui/Chip';
import SideBySideView from '@ui/SideBySideView';
import { Link } from '@ui/NativeWebRouter';
import Settings from '@utils/Settings';

const rockUrl = Settings.rockUrl || 'https://rock.newspring.cc/'; // todo

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withGroupInfo,
);

const StyledImage = styled({
  width: '100%',
  aspectRatio: 2,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(ConnectedImage);

const Label = H7;
const Info = H6;
const GroupInfoContainer = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const CenteredSideBySideView = styled({
  alignItems: 'center',
})(SideBySideView);

const GroupFindCTA = styled({
  alignItems: 'center',
})(PaddedView);

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

const GroupSingle = enhance(({
  group: {
    photo = null,
    name,
    // name
    guid,
    // entityId
    type,
    demographic,
    description,
    // photo
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
  } = {},
  person,
  isLoading,
}) => {
  const leaders = members.filter(x => x.role.toLowerCase() === 'leader');
  const loginParam = person ? person.impersonationParameter : '';

  return (
    <BackgroundView>
      <Header titleText="Group Profile" backButton />
      <ScrollView>
        <StyledImage source={{ url: photo }} />
        <Card isLoading={isLoading}>
          <PaddedView>
            <H3>{name}</H3>
            <GroupInfoContainer>
              <Label>Group Leaders</Label>
              <H5>{leaders.map(leader => `${leader.person.firstName} ${leader.person.lastName}`).join(', ')}</H5>
              <AvatarList>
                {leaders.map(leader => (
                  <Avatar key={leader.person.id} source={{ url: leader.person.photo }} size="medium" />
                ))}
              </AvatarList>
            </GroupInfoContainer>
          </PaddedView>
        </Card>

        <Card isLoading={isLoading}>
          <PaddedView>
            <CenteredSideBySideView>
              <H4>#TheseAreMyPeople</H4>
              <Button title="Contact" bordered onPress={() => Linking.openURL(`${rockUrl}Workflows/304?Group=${guid}${loginParam}`)} />
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
            <H4>Looking for another group?</H4>
            <Link component={Button} bordered to="/groups" pop title="Find A Group" type="default" />
          </GroupFindCTA>
        </Card>
      </ScrollView>
    </BackgroundView>
  );
});

export default GroupSingle;
