import React, { PureComponent } from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Card from '@ui/Card';
import ContributionsChart from '@ui/ContributionsChart';
import withContributionsChartData from '@data/withContributionsChartData';
import { UIText, H6 } from '@ui/typography';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import styled from '@ui/styled';
import Icon from '@ui/Icon';
import Spacer from '@ui/Spacer';
import PaddedView from '@ui/PaddedView';
import { withTheme } from '@ui/theme';

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontStyle: 'italic',
}))(UIText);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

export class ContributionsChartCard extends PureComponent {
  static propTypes = {
    total: PropTypes.number,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    total: 0,
    iconSize: undefined,
  };

  render() {
    return (
      <Card>
        <ContributionsChart />
        <PaddedView>
          <CashAmountIndicator
            amount={this.props.total}
            size={2}
          />
          <Spacer />
          <ItalicText>{'Contributed so far this year'}</ItalicText>
          <Spacer />
          <TouchableWithoutFeedback
            onPress={() => (null)}
          >
            <Row>
              <StyledH6>{'View Giving History'}</StyledH6>
              <Icon name="arrow-next" size={this.props.iconSize} />
            </Row>
          </TouchableWithoutFeedback>
        </PaddedView>
      </Card>
    );
  }
}

const enhance = compose(
  withContributionsChartData,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
);

export default enhance(ContributionsChartCard);
