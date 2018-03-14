import React from 'react';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import Icon from '@ui/Icon';
import { H3, BodyText } from '@ui/typography';
import { withTheme } from '@ui/theme';
import { ButtonLink } from '@ui/Button';
import WebBrowser from '@ui/WebBrowser';

const contact = () => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/152?Topic=Stewardship');

const BackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit * 3,
}))(PaddedView);

const ThemedIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * 3,
  fill: theme.colors.primary,
}))(Icon);

const Heading = styled(({ theme }) => ({
  color: theme.colors.primary,
  paddingBottom: theme.sizing.baseUnit,
  paddingTop: theme.sizing.baseUnit,
}))(H3);

const Success = () => (
  <BackgroundView>
    <ThemedIcon name="circle-outline-check-mark" />
    <Heading>Success!</Heading>
    <BodyText italic>
      If you have any questions please call our Finance Team at 864-965-9990 or{' '}
      <ButtonLink onPress={contact}>contact us</ButtonLink>
      {' '}and someone will be happy to assist you.
    </BodyText>
  </BackgroundView>
);

export default Success;
