import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import truncate from 'truncate';
import { Platform } from 'react-native';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import Card, { CardContent, CardImage } from '@ui/Card';
import { H5, H6, H7, BodyText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import Chip, { ChipList } from '@ui/Chip';
import { Link } from '@ui/NativeWebRouter';
import { ResponsiveSideBySideView } from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';

const LeftColumn = compose(
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(({ theme }) => ({
      paddingVertical: theme.sizing.baseUnit * 0.75,
    })),
    styled(({ theme }) => ({
      paddingVertical: theme.sizing.baseUnit * 2,
      paddingHorizontal: theme.sizing.baseUnit * 1.5,
      width: '60%',
    })),
  ),
)(CardContent);

const ScheduleText = styled(({ theme }) => ({ color: theme.colors.text.tertiary }))(H6);
const DistanceText = styled(({ theme }) => ({ color: theme.colors.text.tertiary }))(H7);

const ImageColumn = mediaQuery(({ md }) => ({ minWidth: md }),
  styled({
    height: '100%',
    position: 'absolute',
    minHeight: 300,
    width: '40%',
  }),
  styled({
    width: '100%',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        aspectRatio: 1.5, // only apply on iOS b/c android overflow:hidden doesn't work
        // makes the placeholders the same size as the loaded images
      },
    }),
  }),
)(FlexedView);

const GroupCardImage = styled({
  width: '100%',
  resizeMode: 'cover',
  aspectRatio: 1.5,
})(CardImage);

const GroupCard = ({
  id = '',
  name = '',
  photo = null,
  type,
  kidFriendly,
  demographic,
  campus,
  isLoading = false,
  description = '',
  tags = [],
  selectedTags = [],
  selectedCampuses = [],
  schedule = {},
  distance,
  onTagPress,
  onSelectCampus,
}) => {
  const card = (
    <Card isLoading={isLoading}>
      <ResponsiveSideBySideView reversed>
        <ImageColumn><GroupCardImage source={{ url: photo }} /></ImageColumn>
        <FlexedView>
          <LeftColumn>
            <H5>{name}</H5>

            {schedule && schedule.description ? (
              <ScheduleText>{schedule.description}</ScheduleText>
            ) : null}

            <DistanceText>{parseInt(distance, 0)} miles away</DistanceText>

            <Paragraph>
              <BodyText numberOfLines={4} ellipsizeMode={'tail'}>
                {Platform.OS === 'web' ? truncate(description, 120) : description}
              </BodyText>
            </Paragraph>

            <ChipList>
              {tags.map((tag) => {
                const selected = selectedTags.map(t => t.toLocaleLowerCase())
                  .indexOf(tag.value.toLocaleLowerCase()) > -1;
                return (
                  <Chip
                    title={tag.value}
                    key={tag.id}
                    selected={selected}
                    icon={selected ? 'close' : undefined}
                    onPress={() => onTagPress(tag.value)}
                  />
                );
              })}
              {(type && type !== 'Interests') ? (() => {
                const selected = selectedTags.find(t => t === type);
                return (<Chip
                  title={type}
                  onPress={() => onTagPress(type)}
                  icon={selected ? 'close' : undefined}
                  selected={selected}
                />);
              })() : null}
              {kidFriendly ? (() => {
                const selected = selectedTags.find(t => t === 'kid friendly');
                return (<Chip
                  title={'kid friendly'}
                  onPress={() => onTagPress('kid friendly')}
                  icon={selected ? 'close' : undefined}
                  selected={selected}
                />);
              })() : null}
              {demographic ? (() => {
                const selected = selectedTags.find(t => t === demographic);
                return (<Chip
                  title={demographic}
                  onPress={() => onTagPress(demographic)}
                  icon={selected ? 'close' : undefined}
                  selected={selected}
                />);
              })() : null}
              {(campus && campus.name) ? (() => {
                const selected = selectedCampuses.find(t => t === campus.name.toLocaleLowerCase());
                return (<Chip
                  title={campus.name}
                  onPress={() => onSelectCampus(campus.name)}
                  icon={selected ? 'close' : undefined}
                  selected={selected}
                />);
              })() : null}
            </ChipList>
          </LeftColumn>
        </FlexedView>
      </ResponsiveSideBySideView>
    </Card>
  );

  if (isLoading) return card;
  return <Link to={`/groups/${id}`}>{card}</Link>;
};

GroupCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
  isLoading: PropTypes.bool,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })),
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  schedule: PropTypes.shape({ description: PropTypes.string }),
  distance: PropTypes.number,
  onTagPress: PropTypes.func,
  type: PropTypes.string,
  kidFriendly: PropTypes.bool,
  demographic: PropTypes.string,
  campus: PropTypes.shape({ name: PropTypes.string }),
  onSelectCampus: PropTypes.func,
  selectedCampuses: PropTypes.arrayOf(PropTypes.string),
};

export default GroupCard;
