import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import { H7 } from '@primitives/typography';
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    type: PropTypes.string,
    color: PropTypes.string,
  }),
);

const Wrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  paddingTop: theme.baseUnit / 2,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit,
}))(View);

const StyledH7 = styled(({ theme, fontColor }) => ({
  paddingHorizontal: theme.baseUnit / 2,
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

const Category = enhance(({
  type,
  color,
  theme,
}) => (
  <Wrapper>
    <Icon
      name={getIconName(type)}
      size={rem(1.2, theme)}
      fill={color}
    />
    <StyledH7 fontColor={color}>{type}</StyledH7>
  </Wrapper>
));

export default Category;
