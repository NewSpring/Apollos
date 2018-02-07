import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  Linking,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import moment from 'moment';

import { H5, H7, H6 } from '@ui/typography';
import { FREQUENCY_IDS } from '@ui/forms/ContributionForm/FrequencyInput';
import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import Button, { ButtonLink } from '@ui/Button';
import WebBrowser from '@ui/WebBrowser';
import linkingUri from '@utils/linkingUri';
import { stringify } from '@utils/queryString';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import Settings from '@utils/Settings';
import TableView, { Cell, Divider } from '@ui/TableView';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import styled from '@ui/styled';
import Icon from '@ui/Icon';

const LargeCellText = styled(({ theme }) => ({
  flexGrow: 1,
  flexShrink: 1,
  paddingLeft: theme.sizing.baseUnit / 2,
  paddingRight: theme.sizing.baseUnit / 2,
}))(H5);

const LabelText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H7);

const SmallValueText = compose(
  styled(({ theme }) => ({
    color: theme.colors.text.secondary,
  })),
)(H6);

const Row = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const ButtonLinkContainer = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit / 2,
  alignItems: 'center',
  justifyContent: 'center',
}))(View);

export class PaymentConfirmationFormWithoutData extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    campus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    contributions: PropTypes.shape({
      frequencyId: PropTypes.oneOf(['today', ...FREQUENCY_IDS.map(f => f.id)]),
      startDate: PropTypes.instanceOf(Date),
      contributions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
      })),
      isPaying: PropTypes.bool,
    }),
    onSubmit: PropTypes.func,
    onPressChangePaymentMethod: PropTypes.func,
    submitButtonText: PropTypes.string,
    submitButtonIcon: PropTypes.string,
    hideChangePaymentMethodButton: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: true,
    campus: '',
    contributions: {
      contributions: [],
      isPaying: false,
    },
    onSubmit() {},
    onPressChangePaymentMethod() {},
    submitButtonText: 'Complete',
    hideChangePaymentMethodButton: false,
  };

  get total() {
    return this.props.contributions.contributions
      .reduce((runningTotal, c) => (runningTotal + c.amount), 0);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <FlexedView>
          <ActivityIndicator />
        </FlexedView>
      );
    }

    return (
      <View>
        <TableView>
          <Cell>
            <LabelText>Campus:{' '}</LabelText>
            <SmallValueText>{this.props.campus}</SmallValueText>
          </Cell>
          <Divider />

          {this.props.contributions.contributions.map(contribution => ([
            <Cell key={contribution.name}>
              <LargeCellText>{contribution.name}</LargeCellText>
              <CashAmountIndicator amount={contribution.amount} size={5} />
            </Cell>,
            <Divider key={`${contribution.name}-divider`} />,
          ]))}

          {(this.props.contributions.frequencyId && this.props.contributions.frequencyId !== 'today') ? ([
            <PaddedView horizontal={false} key="view">
              <LargeCellText>Schedule Details</LargeCellText>
              <Row>
                <LabelText>Frequency:{' '}</LabelText>
                <SmallValueText>
                  {FREQUENCY_IDS.find(f => f.id === this.props.contributions.frequencyId).label}
                </SmallValueText>
              </Row>
              <Row>
                <LabelText>Starting:{' '}</LabelText>
                <SmallValueText>{moment(this.props.contributions.startDate).format('MM/DD/YYYY')}</SmallValueText>
              </Row>
            </PaddedView>,
            <Divider key="divider" />,
          ]) : null}

          <Cell>
            <LargeCellText>Total</LargeCellText>
            <CashAmountIndicator amount={this.total} size={4} />
          </Cell>
        </TableView>

        {(Platform.OS === 'ios') ? (
          <PaddedView>
            <H7>
              {'You\'ll be redirected to Safari to securely complete this contribution.'}
            </H7>
          </PaddedView>
        ) : null}

        <PaddedView vertical={false}>
          <Button
            onPress={this.props.onSubmit}
            loading={this.props.contributions.isPaying}
          >
            <H5>{this.props.submitButtonText}{' '}</H5>
            {this.props.submitButtonIcon ? <Icon name={this.props.submitButtonIcon} size={24} /> : null}
          </Button>

          {!this.props.hideChangePaymentMethodButton && (
            <ButtonLinkContainer>
              <ButtonLink onPress={this.props.onPressChangePaymentMethod}>
                {'Change Payment Method'}
              </ButtonLink>
            </ButtonLinkContainer>
          )}
        </PaddedView>
      </View>
    );
  }
}

function handleRedirect() {
  WebBrowser.dismissBrowser();
}

const PaymentConfirmationForm = compose(
  withGive,
  withRouter,
  withCheckout,
  withProps((props) => {
    const campus = props.campuses && props.campuses
      .find(c => (c.id === get(props, 'contributions.campusId')));

    return ({
      campus: campus && campus.label,
      ...props,
    });
  }),
  withProps(props => ({
    savedPaymentMethod: get(props, 'contributions.paymentMethod') === 'savedPaymentMethod' &&
      get(props, 'savedPaymentMethods', []).find(({ id }) => id === get(props, 'contributions.savedPaymentMethodId')),
    isScheduled: get(props, 'contributions.frequencyId', 'today') !== 'today',
    onSubmit: async () => {
      try {
        if (Platform.OS === 'ios') {
          Linking.addEventListener('url', handleRedirect);
          const userToken = await AsyncStorage.getItem('authToken');

          const res = await WebBrowser.openBrowserAsync(`${Settings.ROOT_URL || 'http://localhost:3000'}/give/restored-checkout?${stringify({
            redirect: `${linkingUri}${props.navigateToOnComplete}`,
            state: JSON.stringify(props.contributions),
            userToken,
          })}`);

          return res;
        }
        props.isPaying(true);
        if (props.contributions.paymentMethod === 'creditCard') {
          await props.validateSingleCardTransaction(); // This seems unnecessary
        }

        const isSavedPaymentMethod = props.contributions.paymentMethod === 'savedPaymentMethod';
        const isScheduled = props.contributions.frequencyId !== 'today';
        if (isSavedPaymentMethod && isScheduled) {
          await props.createOrder();

          props.setPaymentResult({
            success: true,
          });
          return true;
        }

        const createOrderResponse = await props.createOrder();
        const order = get(createOrderResponse, 'data.order', {});
        const token = order.url.split('/').pop();

        await props.postPayment(order.url);
        const completeOrderRes = await props.completeOrder({
          token,
          name: props.contributions.willSavePaymentMethod ?
            props.contributions.savedAccountName : null,
        });
        const unableToCompleteOrderError = get(completeOrderRes, 'data.response.error');
        if (unableToCompleteOrderError) throw new Error(unableToCompleteOrderError);


        props.setPaymentResult({
          success: true,
        });
        if (props.onComplete) props.onComplete(null, true);
        return true;
      } catch (err) {
        console.log('err', err); // eslint-disable-line no-console
        props.setPaymentResult({
          error: err.message,
        });
        if (props.onComplete) props.onComplete(err.message, null);
        return null;
      } finally {
        props.isPaying(false);
        if (Platform.OS === 'ios') {
          Linking.removeEventListener('url', handleRedirect);
        } else if (props.navigateToOnComplete) {
          props.history.push(props.navigateToOnComplete);
        }
      }
    },
  })),
  withProps(({ savedPaymentMethod = {}, isScheduled, contributions = {} }) => {
    let paymentMethod = savedPaymentMethod;
    if (!paymentMethod) {
      paymentMethod = get(contributions, contributions.paymentMethod, {});
    }

    const verb = isScheduled ? 'Schedule' : 'Give';

    const name = (paymentMethod.accountNumber || paymentMethod.cardNumber || '').replace(/-/g, '').slice(-4);

    const text = `${verb} with ${name}`;
    const icon = contributions.paymentMethod === 'creditCard' ? 'credit' : 'bank';
    return {
      submitButtonText: text,
      submitButtonIcon: icon,
    };
  }),
)(PaymentConfirmationFormWithoutData);

export default PaymentConfirmationForm;
