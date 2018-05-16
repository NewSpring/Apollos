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
import SideBySideView, { Left } from '@ui/SideBySideView';

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

const TransactionDetails = enhance(({ id }) => (
  <BackgroundView>
    <Header titleText={'Contribution Details'} backButton webEnabled />
    <FlexedSideBySideView>
      <FlexedLeft>
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
    </FlexedSideBySideView>
  </BackgroundView>
));

TransactionDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TransactionDetails;
