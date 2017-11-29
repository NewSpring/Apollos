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

const StyledH7 = styled(({ theme }) => ({
  paddingHorizontal: theme.baseUnit / 2,
}))(H7);

const Category = enhance(({
  theme,
  type,
}) => (
  <Wrapper>
    <Icon
      name={'video'}
      size={rem(1.2, theme)}
      fill={theme.baseFontColor}
    />
    <StyledH7>{type}</StyledH7>
  </Wrapper>
));

export default Category;
