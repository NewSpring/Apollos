import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
import { BodyText } from '@ui/typography';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import MediaQuery from '@ui/MediaQuery';
import Hero, { BackgroundImage } from '@ui/Hero';

import RecentArticles from 'give/RecentArticles';
import Transaction from './Transaction';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(PaddedView);

const Note = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
  textAlign: 'center',
  color: theme.colors.text.secondary,
}))(BodyText);

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
);

const image =
  'https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg';

const TransactionDetails = enhance(({ id }) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>
        <Header backButton webEnabled />
        <ScrollView>
          <PaperView>
            <Transaction id={id} />
            <PaddedView horizontal={false}>
              <Note>
                {
                  "Thank you for your contribution to NewSpring Church. Because you are obedient in giving, we'll be able to connect more people to Jesus and each other."
                }
              </Note>
            </PaddedView>
          </PaperView>
          <RecentArticles />
        </ScrollView>
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Hero background={<BackgroundImage source={image} />} />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

TransactionDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TransactionDetails;
