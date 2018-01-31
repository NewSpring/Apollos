/* eslint-disable */
import React from 'react';
import BackgroundView from '@ui/BackgroundView';
import { UIText } from '@ui/typography';
import Button from '@ui/Button';
import { parse } from '@utils/queryString';

export default props => (
  <BackgroundView>
    <UIText>{'hola!'}</UIText>
    <Button
      onPress={() => {
        console.log(props);
        console.log(parse(props.location.search));
      }}
      title="click to return"
    />
  </BackgroundView>
);
