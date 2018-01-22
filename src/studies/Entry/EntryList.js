import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { View } from 'react-native';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import { H5 } from '@ui/typography';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string,
    entries: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    title: 'Next In This Study',
    isLoading: false,
  }),
  withIsLoading,
);

const Title = styled(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.sizing.baseUnit,
}))(H5);

const Wrapper = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  backgroundColor: theme.colors.lightSecondary,
}))(View);

const EntryList = enhance(({
  title,
  entries,
  isLoading,
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <HorizontalTileFeed
      content={entries}
      isLoading={isLoading}
    />
  </Wrapper>
));

export default EntryList;
