import React from 'react';
import { View, Platform } from 'react-native';
import MediaQuery from '@ui/MediaQuery';
import { Link } from '@ui/NativeWebRouter';
import { H7 } from '@ui/typography';
import Icon from '@ui/Icon';
import styled from '@ui/styled';

const Row = styled({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' })(View);

const Container = styled(
  ({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 5, // fixes hitSlop by positiong button above header text
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 100, // adds extra hitSlop space.
    ...Platform.select({
      web: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        left: theme.sizing.baseUnit,
        top: theme.sizing.baseUnit,
      },
    }),
  }),
  'BackButton.Container',
)(View);

const BackButton = props => (
  <Container>
    {/* Mostly arbitrary hitSlop values taken from padding values above */}
    <Link pop style={{ paddingRight: 100, paddingLeft: 4 }}>
      <Row>
        <Icon name="arrow-back" size={24} {...props} />
        <MediaQuery minWidth="md">
          <H7>Back</H7>
        </MediaQuery>
      </Row>
    </Link>
  </Container>
);

export default BackButton;
