import React from 'react';
import PropTypes from 'prop-types';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import Icon from '@ui/Icon';
import { H3, H4, BodyText } from '@ui/typography';
import { withTheme } from '@ui/theme';
import Button, { ButtonLink } from '@ui/Button';
import WebBrowser from '@ui/WebBrowser';
import Paragraph from '@ui/Paragraph';
import { Link } from '@ui/NativeWebRouter';

const contact = () => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/152?Topic=Stewardship');

const BackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit * 3,
}))(PaddedView);

const ThemedIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * 3,
  fill: theme.colors.alert,
}))(Icon);

const Heading = styled(({ theme }) => ({
  color: theme.colors.alert,
  paddingTop: theme.sizing.baseUnit,
}))(H3);

const SubHeading = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  paddingBottom: theme.sizing.baseUnit,
  textAlign: 'center',
}))(H4);

const Failure = ({ paymentFailedMessage }) => (
  <BackgroundView>
    <ThemedIcon name="circle-outline-x-mark" />
    <Heading>Uh Oh!</Heading>
    <SubHeading>Looks like there was a problem adding your payment method.</SubHeading>
    {paymentFailedMessage ? (
      <Paragraph><BodyText>{paymentFailedMessage}</BodyText></Paragraph>
    ) : null}
    <Paragraph>
      <Link pop>
        <Button title="Try Again" />
      </Link>
    </Paragraph>
    <Paragraph>
      <BodyText italic>
        If you would like a member of our customer support team to follow up with you regarding
        this error, please{' '}
        <ButtonLink onPress={contact}>contact us</ButtonLink>
        {' '}and someone will be happy to assist you.
      </BodyText>
    </Paragraph>
  </BackgroundView>
);

Failure.propTypes = {
  paymentFailedMessage: PropTypes.string,
};

export default Failure;
