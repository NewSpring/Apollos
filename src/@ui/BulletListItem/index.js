import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styled from '@ui/styled';
import { BodyText } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.oneOfType([
      /*
       * There is no way to type check against known text nodes but expect problems if you try to
       * pass something other than a string or text elements (this includes children of children).
       */
      PropTypes.string,
      PropTypes.node,
    ]),
  }),
);

const Wrapper = styled({
  flexDirection: 'row',
})(View);

const Bullet = styled(({ theme }) => ({
  // Set in a typographic unit to reflect changes in the default type size.
  paddingRight: theme.helpers.rem(1) / 2,
}))(View);

const IosTextWrapFix = styled({ // 😢
  flexShrink: 1,
})(View);

const BulletListItem = enhance(({
  children,
}) => (
  <Wrapper>
    <Bullet>
      <BodyText>•</BodyText>
    </Bullet>
    <IosTextWrapFix>
      {typeof children === 'string' ? <BodyText>{children}</BodyText> : children}
    </IosTextWrapFix>
  </Wrapper>
));

export default BulletListItem;
