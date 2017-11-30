import React from 'react';
import { View } from 'react-native';
import { Link } from '@modules/TabBar';
import styled from '@primitives/styled';

const Container = styled({
  position: 'absolute',
  left: 4,
  top: 0,
  bottom: 0,
})(View);

const BackButton = () => (
  <Container>
    <Link pop icon="arrow-back" iconSize={24} />
  </Container>
);

export default BackButton;
