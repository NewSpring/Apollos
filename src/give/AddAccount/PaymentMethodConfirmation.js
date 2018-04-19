import React from 'react';
import { compose, mapProps } from 'recompose';
import { withRouter } from '@ui/NativeWebRouter';
import BackgroundView from '@ui/BackgroundView';
import SavedPaymentReviewForm from '@ui/forms/SavedPaymentReviewForm';
import PaddedView from '@ui/PaddedView';
import { Title, Row, TinyButton, TinyButtonText } from '../styles';


const enhance = compose(
  withRouter,
  mapProps(props => ({
    onPressEdit() {
      props.history.push('address');
    },
  })),
);

const PaymentMethodConfirmation = enhance(({ onPressEdit }) => (
  <BackgroundView>
    <PaddedView>
      <Row>
        <Title>Review</Title>
        <TinyButton onPress={onPressEdit}>
          <TinyButtonText>Edit</TinyButtonText>
        </TinyButton>
      </Row>
    </PaddedView>
    <SavedPaymentReviewForm
      navigateToOnComplete="done"
    />
  </BackgroundView>
));

export default PaymentMethodConfirmation;

