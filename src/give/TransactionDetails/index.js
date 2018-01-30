import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import { withRouter } from '@ui/NativeWebRouter';
import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import styled from '@ui/styled';
import { UIText } from '@ui/typography';

import Transaction from './Transaction';
import ArrowBack from './ArrowBack';

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  padding: theme.sizing.baseUnit / 2,
}), 'BackgroundView')(View);

const Note = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
  textAlign: 'center',
  color: theme.colors.text.secondary,
}))(UIText);

class TransactionDetails extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    goBack: PropTypes.func,
  };

  static defaultProps = {
    id: undefined,
    goBack() {},
  };

  render() {
    return (
      <View>
        <PaperView>
          <Header
            titleText="Transaction"
            backButton
          />

          <ArrowBack
            onPress={this.props.goBack}
          />

          <Transaction
            id={this.props.id}
          />

          <Note>
            {'Thank you for your contribution to NewSpring Church. Because you are obedient in giving, we\'ll be able to connect more people to Jesus and each other.'}
          </Note>
        </PaperView>
        <BackgroundView />
      </View>
    );
  }
}

const enhance = compose(
  withRouter,
  withProps(props => ({
    id: get(props, 'match.params.id'),
    goBack() {
      props.history.goBack();
    },
  })),
);

export default enhance(TransactionDetails);
