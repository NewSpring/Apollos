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
    left: 4,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
    {/* Mostly arbitrary hitSlop values. Left is taken from and accounts for positioning above */}
    <Link pop hitSlop={{ right: 50, left: 4 }}>
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
