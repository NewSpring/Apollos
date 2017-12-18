import React from 'react';
import { Linking, Text } from 'react-native';
// import moment from 'moment';
// import PropTypes from 'prop-types';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
// import { H5, H3, UIText } from '@ui/typography';
import { H3, UIText } from '@ui/typography';
import LinkText from '@ui/LinkText';
import Icon from '@ui/Icon';

const CenteredView = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const CenteredText = styled({
  textAlign: 'center',
})(Text);

const Failure = props => console.log({ props }) || (
  <CenteredView>
    <Icon name="warning" />
    <CenteredText>
      <H3>Uh Oh! Looks like there wa a problem processing your contribution.</H3>
      <UIText>
        If you would like a member of our customer support team to follow up with you regarding
        this error, please <LinkText onPress={() => Linking.openURL('https://rock.newspring.cc/workflows/152?Topic=Stewardship')}>contact us</LinkText>.
      </UIText>
    </CenteredText>
  </CenteredView>
);

export default Failure;
