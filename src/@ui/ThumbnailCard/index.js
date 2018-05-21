import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card, { CardContent } from '@ui/Card';
import SideBySideView from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import { H5, BodyText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import CategoryLabel from '@ui/CategoryLabel';

import Thumbnail from './Thumbnail';

const enhance = compose(
  setPropTypes({
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    images: Thumbnail.propTypes.source,
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

const LeftColumn = compose(
  styled({ flex: 1.66 }),
  mediaQuery(
    ({ md }) => ({ maxWidth: md }),
    styled(({ theme }) => ({
      paddingVertical: theme.sizing.baseUnit * 0.75,
    })),
    styled(({ theme }) => ({
      paddingVertical: theme.sizing.baseUnit * 2,
      paddingHorizontal: theme.sizing.baseUnit * 1.5,
    })),
  ),
)(CardContent);

const RightColumn = styled({
  alignSelf: 'stretch',
})(FlexedView);

const ThumbnailCard = enhance(
  ({
    title, description, images, thumbnailImage, category, isLoading, ...otherProps
  }) => (
    <Card isLoading={isLoading} {...otherProps}>
      <HorizontalLayout>
        <LeftColumn>
          <H5>{title}</H5>
          {description ? (
            <Paragraph>
              <BodyText>{description}</BodyText>
            </Paragraph>
          ) : null}
          {typeof category !== 'undefined' ? (
            <CategoryLabel label={startCase(toLower(category))} isLoading={isLoading} />
          ) : null}
        </LeftColumn>
        {images ? (
          <RightColumn>
            <Thumbnail source={images} thumbnail={thumbnailImage} />
          </RightColumn>
        ) : null}
      </HorizontalLayout>
    </Card>
  ),
);

export default ThumbnailCard;
