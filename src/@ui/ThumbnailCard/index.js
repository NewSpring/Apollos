import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { Platform } from 'react-native';
import { startCase, toLower } from 'lodash';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card, { CardContent } from '@ui/Card';
import SideBySideView from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import { H5 } from '@ui/typography';
import CategoryLabel from '@ui/CategoryLabel';

import Thumbnail from './Thumbnail';

const enhance = compose(
  setPropTypes({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
  withIsLoading,
  pure,
);

const HorizontalLayout = styled({
  alignItems: 'center',
  minHeight: 110, // kind of the best middle ground for various title lengths.
})(SideBySideView);

const LeftColumn = styled({
  flex: 1.66,
})(CardContent);

const RightColumn = styled({
  alignSelf: 'stretch',
  ...Platform.select({
    web: {
      position: 'relative',
    },
  }),
})(FlexedView);

const ThumbnailCard = enhance(({
  title,
  image,
  category,
  isLoading,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <HorizontalLayout>
      <LeftColumn>
        <H5>{startCase(toLower(title))}</H5>
        { category ? (
          <CategoryLabel label={startCase(toLower(category))} isLoading={isLoading} />
        ) : null }
      </LeftColumn>

      { image ? (
        <RightColumn>
          <Thumbnail source={{ url: image }} />
        </RightColumn>
      ) : null }
    </HorizontalLayout>
  </Card>
));

export default ThumbnailCard;
