import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import PaddedView from '@ui/PaddedView';
import { H7, BodyCopy } from '@ui/typography';
import styled from '@ui/styled';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import { Link } from '@ui/NativeWebRouter';
import CardTile from '@ui/CardTile';
import { ButtonLink } from '@ui/Button';

const LocationCard = styled(({ theme, isHighlighted }) => ({
  backgroundColor: theme.colors.background.paper,
  ...(isHighlighted ? {
    borderColor: theme.colors.primary,
    borderWidth: 3,
  } : {}),
  ...Platform.select(theme.shadows.default),
}))(CardTile);

const LearnMoreText = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit / 2,
}))(ButtonLink);

const DistanceText = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit / 2,
  color: theme.colors.text.tertiary,
}))(H7);

const renderCampus = ({ item: campus }) => (
  <Link to={campus.url}>
    <LocationCard
      isHighlighted={campus.isHighlighted}
      title={campus.name || ''}
      isLoading={campus.isLoading}
    >
      <PaddedView vertical={false}>
        {(() => {
          if (!campus.distance || !campus.distance.value) return null;
          return (
            <DistanceText>
              {(campus.distance.value * 0.000621371192).toFixed(2)} miles away
            </DistanceText>
          );
        })()}
        {campus.services && campus.services.map(x =>
          (<BodyCopy key={x}>{x}</BodyCopy>))
        }
        <LearnMoreText>Learn More ›</LearnMoreText>
      </PaddedView>
    </LocationCard>
  </Link>
);

renderCampus.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    service: PropTypes.arrayOf(PropTypes.string),
  }),
};

const CampusFeed = compose(
  withProps(({ campuses = [], geoElements = [] } = {}) => ({
    content: campuses
      .filter(campus => campus.location && campus.location.street1)
      .map((campus, i) => ({
        ...campus,
        distance: geoElements[i] ? geoElements[i].distance : undefined,
      }))
      .sort((l, r) => (l.distance && l.distance.value) - (r.distance && r.distance.value))
      .map((item, i) => ({ ...item, isHighlighted: geoElements.length > 0 && i === 0 })),
    renderItem: renderCampus,
  })),
)(HorizontalTileFeed);

export default CampusFeed;
