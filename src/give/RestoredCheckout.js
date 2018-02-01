import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import get from 'lodash/get';
import BackgroundView from '@ui/BackgroundView';
import { UIText } from '@ui/typography';
import Button from '@ui/Button';
import { parse } from '@utils/queryString';
import withGive from '@data/withGive';

export default withGive((props) => {
  const { redirect, state, userToken } = parse(get(props, 'location.search', {}));

  // Restore state
  props.restoreContributions(state);

  // Restore user
  AsyncStorage.setItem('authToken', userToken);

  // LEFT OFF HERE: Need to turn restoreLogic into a decorator
  // And render PaymentConfirmation underneath it
  return (
    <BackgroundView>
      <UIText>{`${redirect}`}</UIText>
      <UIText>{`${state}`}</UIText>
      <Button
        onPress={() => {
          window.location.href = redirect;
        }}
        title="click to return"
      />
    </BackgroundView>
  );
});
