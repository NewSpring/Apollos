import React from 'react';
import { Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import { BodyCopy } from '@ui/typography';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import MediaQuery from '@ui/MediaQuery';
import Hero, { BackgroundImage } from '@ui/Hero';

import RecentArticles from 'give/RecentArticles';
import Transaction from './Transaction';
import Banner from '../detail-hero.jpg';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(PaddedView);

const Note = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
  textAlign: 'center',
  color: theme.colors.text.secondary,
}))(BodyCopy);

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
);

const TransactionDetails = enhance(({ id }) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header
          titleText={Platform.OS !== 'web' ? 'Contribution Details' : null}
          backButton
          webEnabled
        />
        <ScrollView>
          <PaperView>
            <Transaction id={id} />
            <PaddedView horizontal={false}>
              <Note>
                {'Thank you for your contribution to NewSpring Church. Because you are obedient in giving, we\'ll be able to connect more people to Jesus and each other.'}
              </Note>
            </PaddedView>
          </PaperView>
          <RecentArticles />
        </ScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={Banner} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

TransactionDetails.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TransactionDetails;
