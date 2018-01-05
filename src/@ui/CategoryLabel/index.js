import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { kebabCase } from 'lodash';
import Placeholder from 'rn-placeholder';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';
import Icon from '@ui/Icon';
import * as Icons from '@ui/Icon/icons';

const enhance = compose(
  pure,
  withTheme(({ theme, color }) => ({
    color: color || theme.colors.text.primary,
    theme,
  })),
  setPropTypes({
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)),
    color: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
  }),
);

const Wrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit / 2,
}))(View);

const PlaceholderWrapper = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const LabelText = styled(({ color: fontColor }) => ({
  color: fontColor,
}))(H7);

// TODO: Ideally this should take an the current category and map it against an array of all the
// categories in Heighliner
const getIconName = (label, icon) => {
  if (typeof icon === 'undefined') {
    switch (label) {
      case 'Series':
        return 'video';
      case 'Albums':
        return 'audio';
      default:
        return 'text';
    }
  } else {
    return icon;
  }
};

const CategoryLabel = enhance(({
  label,
  icon,
  color: fontColor,
  isLoading,
  children,
  theme,
}) => (
  <Wrapper>
    <Icon
      name={getIconName(label, icon)}
      size={theme.helpers.rem(1.2)}
      fill={fontColor}
      isLoading={isLoading}
    />
    <PlaceholderWrapper>
      <Placeholder.Line
        width={'40%'}
        textSize={theme.helpers.rem(1)}
        onReady={!isLoading}
      >
        <LabelText color={fontColor}>{label}</LabelText>
      </Placeholder.Line>
    </PlaceholderWrapper>
    {children}
  </Wrapper>
));

export default CategoryLabel;
