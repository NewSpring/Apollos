import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card, { CardContent, CardImage } from '@ui/Card';
import SideBySideView from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import { H5 } from '@ui/typography';
import CategoryLabel from '@ui/CategoryLabel';

const enhance = compose(
  setPropTypes({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
  withIsLoading,
  pure,
);

const HorizontalLayout = styled({
  alignItems: 'center',
})(SideBySideView);

const RelatedContentCard = enhance(({
  title,
  image,
  category,
  isLoading,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <HorizontalLayout>
      <CardContent>
        <H5>{title}</H5>
        { category ? (
          <CategoryLabel label={category} />
        ) : null }
      </CardContent>

      <FlexedView>
        <CardImage source={{ url: image }} />
      </FlexedView>
    </HorizontalLayout>
  </Card>
));

export default RelatedContentCard;
