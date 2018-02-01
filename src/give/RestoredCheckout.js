import React from 'react';
import get from 'lodash/get';
import BackgroundView from '@ui/BackgroundView';
import { UIText } from '@ui/typography';
import Button from '@ui/Button';
import { parse } from '@utils/queryString';

export default function RestoredCheckout(props) {
  const { redirect } = parse(get(props, 'location.search', {}));

  return (
    <BackgroundView>
      <UIText>{`${redirect}`}</UIText>
      <Button
        onPress={() => {
          window.location.href = redirect;
        }}
        title="click to return"
      />
    </BackgroundView>
  );
}
