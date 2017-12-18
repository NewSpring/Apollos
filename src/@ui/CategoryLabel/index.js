import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import Placeholder from 'rn-placeholder';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';
import Icon from '@ui/Icon';

const enhance = compose(
  pure,
  withTheme(({ theme, color }) => ({
    color: color || theme.colors.text.primary,
    theme,
  })),
  setPropTypes({
    type: PropTypes.string,
    color: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
);

const Wrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  paddingTop: theme.sizing.baseUnit / 2,
  paddingRight: theme.sizing.baseUnit,
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
  isLoading,
  theme,
}) => (
  <Wrapper>
    <Placeholder.ImageContent
      firstLineWidth={'40%'}
      width={'40%'}
      lastLineWidth={'40%'}
      textSize={theme.helpers.rem(1.2)}
      lineNumber={1}
      size={theme.helpers.rem(1.2)}
      hasRadius
      onReady={!isLoading}
    >
      <Icon
        name={getIconName(type)}
        size={theme.helpers.rem(1.2)}
        fill={fontColor}
      />
      <StyledH7 color={fontColor}>{type}</StyledH7>
    </Placeholder.ImageContent>
  </Wrapper>
));

export default CategoryLabel;
