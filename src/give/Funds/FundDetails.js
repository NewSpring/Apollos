import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { compose, mapProps } from 'recompose';
import withFinancialAccounts from '@data/withFinancialAccounts';
import styled from '@ui/styled';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import MediaQuery from '@ui/MediaQuery';
import Hero, { BackgroundImage } from '@ui/Hero';
import HTMLView from '@ui/HTMLView';
import PaddedView from '@ui/PaddedView';
import { ContributionForm } from '@ui/forms';
import ConnectedImage from '@ui/ConnectedImage';
import { H2 } from '@ui/typography';

const enhance = compose(
  withFinancialAccounts,
  mapProps(({ accounts = [], match: { params: { id } }, ...otherProps }) => ({
    ...otherProps,
    fund: accounts.find(account => `${account.id}` === `${id}`),
  })),
);

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const StyledImage = styled({
  width: '100%',
  aspectRatio: 2,
  ...Platform.select({
    web: {
      height: 0,
      paddingTop: '50%',
    },
  }),
})(ConnectedImage);

const FundDetails = enhance(({
  fund: {
    name,
    id,
    images,
    description,
  } = {},
}) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header
          titleText={name}
          backButton
          webEnabled
        />
        <ScrollView>
          <MediaQuery maxWidth="md">
            <StyledImage source={images} />
          </MediaQuery>
          <PaddedView>
            <MediaQuery maxWidth="md">
              <H2>{name}</H2>
            </MediaQuery>
            <HTMLView>
              {description}
            </HTMLView>
          </PaddedView>
          <ContributionForm
            onComplete={({ history, savedPaymentMethods } = {}) => {
              const userHasPaymentMethods = savedPaymentMethods.length > 0;
              if (userHasPaymentMethods) {
                return history.push('/give/checkout/confirm');
              }
              return history.push('/give/checkout');
            }}
            preselection={{ id, name }}
          />
        </ScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={images} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

export default FundDetails;
