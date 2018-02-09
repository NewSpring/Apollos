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

import { H4, H5, H6, H7, BodyText } from '@ui/typography';
import { FREQUENCY_IDS } from '@ui/forms/ContributionForm/FrequencyInput';
import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import styled from '@ui/styled';
import Button, { ButtonLink } from '@ui/Button';
import WebBrowser from '@ui/WebBrowser';
import linkingUri from '@utils/linkingUri';
import { stringify } from '@utils/queryString';
import FlexedView from '@ui/FlexedView';
import Settings from '@utils/Settings';

const Row = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.background.accent,
  flexDirection: 'row',
  justifyContent: 'space-between',
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
        <Row>
          <H7>Campus</H7>
          <H7>{this.props.campus}</H7>
        </Row>

        {this.props.contributions.contributions.map(contribution => (
          <Row key={contribution.name}>
            <H5>{contribution.name}</H5>
            <H6>$<H5>{contribution.amount.toFixed(2).split('.')[0]}</H5>.{contribution.amount.toFixed(2).split('.')[1]}</H6>
          </Row>
        ))}

        {(this.props.contributions.frequencyId && this.props.contributions.frequencyId !== 'today') ? (
          <Row>
            <View>
              <H5>Schedule Details</H5>
              <H7>
                {'Frequency: '}
                {FREQUENCY_IDS.find(f => f.id === this.props.contributions.frequencyId).label}
              </H7>
              <H7>
                Starting: {moment(this.props.contributions.startDate).format('MM/DD/YYYY')}
              </H7>
            </View>
          </Row>
        ) : null}

        <Row>
          <H5>Total</H5>
          <H5>$<H4>{this.total.toFixed(2).split('.')[0]}</H4>.{this.total.toFixed(2).split('.')[1]}</H5>
        </Row>

        {(Platform.OS === 'ios') ? (
          <BodyText>
            {'Due to Apple policies, you\'ll be redirected to Safari to complete this contribution.'}
          </BodyText>
        ) : null}

        <Button
          onPress={this.props.onSubmit}
          title={this.props.submitButtonText}
          loading={this.props.contributions.isPaying}
        />

        {!this.props.hideChangePaymentMethodButton && (
          <ButtonLink onPress={this.props.onPressChangePaymentMethod}>
            {'Change Payment Method'}
          </ButtonLink>
        )}
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
    onSubmit: async () => {
      try {
        if (Platform.OS === 'ios') {
          Linking.addEventListener('url', handleRedirect);
          const userToken = await AsyncStorage.getItem('authToken');

          const res = await WebBrowser.openBrowserAsync(`${Settings.APP_ROOT_URL || 'http://localhost:3000'}/give/restored-checkout?${stringify({
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
)(PaymentConfirmationFormWithoutData);

export default PaymentConfirmationForm;
