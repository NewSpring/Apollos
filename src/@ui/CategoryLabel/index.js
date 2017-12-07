import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';
import Icon from '@ui/Icon';

const enhance = compose(
  pure,
  withTheme(({ theme, color }) => ({
    color: color || theme.colors.common.lightPrimary,
    theme,
  })),
  setPropTypes({
    type: PropTypes.string,
    color: PropTypes.string,
  }),
);

const Wrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  paddingTop: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit,
}))(View);

const StyledH7 = styled(({ color: fontColor, theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit / 2,
  color: fontColor,
}))(H7);

// TODO: Ideally this should take an the current category and map it against an array of all the
// categories in Heighliner
const getIconName = (type) => {
  switch (type) {
    case 'Series':
      return 'video';
    case 'Albums':
      return 'audio';
    default:
      return 'text';
  }
};

const CategoryLabel = enhance(({
  type,
  color: fontColor,
  theme,
}) => (
  <Wrapper>
    <Icon
      name={getIconName(type)}
      size={theme.typography.rem(1.2)}
      fill={fontColor}
    />
    <StyledH7 color={fontColor}>{type}</StyledH7>
  </Wrapper>
));

export default CategoryLabel;
