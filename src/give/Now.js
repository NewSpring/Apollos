import React from 'react';
import KeyboardAwareScrollView from '@ui/KeyboardAwareScrollView';
import BackgroundView from '@ui/BackgroundView';
import { ContributionForm } from '@ui/forms';
import { BodyText } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import Card, { CardContent } from '@ui/Card';
import styled from '@ui/styled';
import WebBrowser from '@ui/WebBrowser';
import { track, events, categories } from '@utils/analytics';
import Funds from './Funds';

const FooterCard = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}))(Card);

const Now = () => (
  <BackgroundView>
    <KeyboardAwareScrollView>
      <ContributionForm
        onComplete={({ history, savedPaymentMethods } = {}) => {
          const userHasPaymentMethods = savedPaymentMethods.length > 0;

          track(events.GivingStarted, categories.Give);

          if (userHasPaymentMethods) {
            return history.push('/give/checkout/confirm');
          }
          return history.push('/give/checkout');
        }}
      />
      <FooterCard>
        <CardContent>
          <BodyText>
            {/* TODO: Pull this link from Heighliner instead of hard coding */}
            {'Trouble giving? Submit a '}
            <ButtonLink
              onPress={() => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/209')}
            >
              help request
            </ButtonLink>.
          </BodyText>
        </CardContent>
      </FooterCard>
      <Funds />
    </KeyboardAwareScrollView>
  </BackgroundView>
);

export default Now;
