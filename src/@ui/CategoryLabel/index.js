import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
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
    children: PropTypes.node,
  }),
);

const Wrapper = styled({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const PlaceholderWrapper = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

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
  isLoading,
  theme,
}) => (
  <Wrapper>
    <Icon
      name={getIconName(label, icon)}
      size={theme.helpers.rem(1.2)}
      fill={theme.colors.text.primary}
      isLoading={isLoading}
    />
    <PlaceholderWrapper>
      <H7>{label}</H7>
    </PlaceholderWrapper>
  </Wrapper>
));

export default CategoryLabel;
