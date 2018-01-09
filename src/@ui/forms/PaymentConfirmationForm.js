import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import get from 'lodash/get';
import moment from 'moment';

import { H4, H5, H6, UIText } from '@ui/typography';
import { FREQUENCY_IDS } from '@ui/forms/ContributionForm/FrequencyInput';
import { withRouter } from '@ui/NativeWebRouter';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';
import styled from '@ui/styled';
import Button from '@ui/Button';

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
  };

  static defaultProps = {
    isLoading: true,
    campus: '',
    contributions: {
      contributions: [],
      isPaying: false,
    },
    onSubmit() {},
  };

  get total() {
    return this.props.contributions.contributions
      .reduce((runningTotal, c) => (runningTotal + c.amount), 0);
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <Row>
          <UIText>Campus</UIText>
          <UIText>{this.props.campus}</UIText>
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
              <UIText>
                {'Frequency: '}
                {FREQUENCY_IDS.find(f => f.id === this.props.contributions.frequencyId).label}
              </UIText>
              <UIText>
                Starting: {moment(this.props.contributions.startDate).format('MM/DD/YYYY')}
              </UIText>
            </View>
          </Row>
        ) : null}

        <Row>
          <H5>Total</H5>
          <H5>$<H4>{this.total.toFixed(2).split('.')[0]}</H4>.{this.total.toFixed(2).split('.')[1]}</H5>
        </Row>

        <Button onPress={this.props.onSubmit} title="Complete" loading={this.props.contributions.isPaying} />
      </View>
    );
  }
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
        props.isPaying(true);
        if (props.contributions.paymentMethod === 'creditCard') {
          await props.validateSingleCardTransaction(); // This seems unnecessary
        }
        await props.postPayment();

        // NOTE: Need to keep reading through
        // the code to understand what id and name are for
        const completeOrderRes = await props.completeOrder(props.contributions.orderPaymentToken);
        const unableToCompleteOrderError = get(completeOrderRes, 'data.response.error');
        if (unableToCompleteOrderError) throw new Error(unableToCompleteOrderError);

        // TODO: this can be simplified
        if (props.willSavePaymentMethod) {
          await props.resetContributions();
          const createOrderResponse = await props.createOrder();
          const order = get(createOrderResponse, 'data.order', {});
          const token = order.url.split('/').pop();
          await props.setOrder({
            url: order.url,
          });
          await props.postPayment();
          await props.savePaymentMethod({
            token,
            name: props.contributions.savedAccountName,
          });
        }

        props.setPaymentResult({
          success: true,
        });
        return true;
      } catch (err) {
        console.log('err', err); // eslint-disable-line no-console
        props.setPaymentResult({
          error: err.message,
        });
        return null;
      } finally {
        props.isPaying(false);
        if (props.navigateToOnComplete) props.history.push(props.navigateToOnComplete);
      }
    },
  })),
)(PaymentConfirmationFormWithoutData);

export default PaymentConfirmationForm;
