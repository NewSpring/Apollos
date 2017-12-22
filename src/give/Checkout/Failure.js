import React from 'react';
import { Linking } from 'react-native';
// import moment from 'moment';
// import PropTypes from 'prop-types';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
// import { H5, H3, UIText } from '@ui/typography';
import { H3, H4, UIText } from '@ui/typography';
import LinkText from '@ui/LinkText';
import Icon from '@ui/Icon';

const CenteredView = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const CenteredH3 = styled({
  textAlign: 'center',
})(H3);

const CenteredH4 = styled({
  textAlign: 'center',
})(H4);

const CenteredText = styled({
  textAlign: 'center',
})(UIText);

const Failure = () => (
  <CenteredView>
    <Icon name="warning" />
    <CenteredH3>Uh Oh!</CenteredH3>
    <CenteredH4>Looks like there was a problem processing your contribution.</CenteredH4>
    <CenteredText>
      If you would like a member of our customer support team to follow up with you regarding
      this error, please <LinkText onPress={() => Linking.openURL('https://rock.newspring.cc/workflows/152?Topic=Stewardship')}>contact us</LinkText>.
    </CenteredText>
  </CenteredView>
);

export default Failure;
