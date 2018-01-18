import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent, CardImage } from '@ui/Card';
import { H5, H6, H7, UIText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import Chip, { ChipList } from '@ui/Chip';
import { Link } from '@ui/NativeWebRouter';
import { ResponsiveSideBySideView } from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';

const GroupCard = ({
  id = '',
  name = '',
  photo = null,
  isLoading = false,
  description = '',
  tags = [],
  selectedTags = [],
  schedule = {},
  distance,
  onTagPress,
}) => {
  const card = (
    <Card isLoading={isLoading}>
      <ResponsiveSideBySideView reversed>
        <FlexedView><CardImage source={{ url: photo }} /></FlexedView>
        <FlexedView>
          <CardContent>
            <H5>{name}</H5>

            {schedule && schedule.description ? (
              <H6>{schedule.description}</H6>
            ) : null}

            <H7>{parseInt(distance, 0)} miles away</H7>

            <Paragraph><UIText>{description}</UIText></Paragraph>

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
                    onPress={() => onTagPress(tag)}
                  />
                );
              })}
            </ChipList>
          </CardContent>
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
};

export default GroupCard;
