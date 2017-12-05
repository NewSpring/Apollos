import React from 'react';
import { View } from 'react-native';
import { Link } from '@ui/TabBar';
import styled from '@ui/styled';

const Container = styled({
  position: 'absolute',
  left: 4,
  top: 0,
  bottom: 0,
}, 'BackButton.Container')(View);

const BackButton = () => (
  <Container>
    <Link pop icon="arrow-back" iconSize={24} />
  </Container>
);

export default BackButton;
