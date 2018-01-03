import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import styled from '@ui/styled';

const TiledFeed = styled(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const ItemWrapper = styled(({ theme }) => ({
  width: '25%',
  minWidth: 250,
  maxWidth: 375,
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const enhance = compose(
  pure,
  setPropTypes({
    data: PropTypes.array, // eslint-disable-line
    renderItem: PropTypes.func,
  }),
);

const itemRenderer = (data, renderItem) => (
  data.map(item => (
    <ItemWrapper>
      {renderItem({ item })}
    </ItemWrapper>
  ))
);

const TileFeed = enhance(({
  data,
  renderItem,
}) => (
  <TiledFeed>
    {itemRenderer(data, renderItem)}
  </TiledFeed>
));

export default TileFeed;
