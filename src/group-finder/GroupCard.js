import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent, CardImage, CardText, CardParagraph } from '@ui/Card';
import { H5, H6, H7 } from '@ui/typography';
import Chip, { ChipList } from '@ui/Chip';
import { Link } from '@ui/NativeWebRouter';
import SideBySideView from '@ui/SideBySideView';
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
}) => (
  <Link to={!isLoading ? `/groups/${id}` : null}>
    <Card isLoading={isLoading}>
      <SideBySideView reversed>
        <FlexedView><CardImage source={{ url: photo }} /></FlexedView>
        <FlexedView>
          <CardContent>
            <CardText Type={H5}>{name}</CardText>

            {schedule && schedule.description ? (
              <CardText Type={H6}>{schedule.description}</CardText>
            ) : null}

            <CardText Type={H7}>{parseInt(distance, 0)} miles away</CardText>

            <CardParagraph>{description}</CardParagraph>

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
      </SideBySideView>
    </Card>
  </Link>
);

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
