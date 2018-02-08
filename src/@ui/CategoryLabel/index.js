import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { kebabCase } from 'lodash';

import { withIsLoading } from '@ui/isLoading';
import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';
import Icon from '@ui/Icon';
import * as Icons from '@ui/Icon/icons';

const enhance = compose(
  withIsLoading,
  pure,
  withTheme(),
  setPropTypes({
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(Object.keys(Icons).map(kebabCase)),
    color: PropTypes.string,
    isLoading: PropTypes.bool,
    withFlex: PropTypes.bool,
  }),
  defaultProps({
    withFlex: false,
  }),
);

const Wrapper = styled(({ flexed }) => ({
  flex: flexed ? 1 : null,
  flexDirection: 'row',
  alignItems: 'center',
}))(View);

const PlaceholderWrapper = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
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
      case 'Need To Know':
        return 'leaf-outline';
      case 'Groups':
        return 'groups';
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
  withFlex,
  isLoading,
  theme,
}) => (
  <Wrapper flexed={withFlex}>
    <Icon
      name={getIconName(label, icon)}
      size={theme.helpers.rem(1.2)}
      fill={theme.colors.text.secondary}
      isLoading={isLoading}
    />
    <PlaceholderWrapper>
      <StyledH7>{label}</StyledH7>
    </PlaceholderWrapper>
  </Wrapper>
));

export default CategoryLabel;
