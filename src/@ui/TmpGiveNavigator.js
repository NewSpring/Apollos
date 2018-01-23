import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from '@ui/NativeWebRouter';
import styled from '@ui/styled';
import { UIText } from '@ui/typography';

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

function GiveNavigator(props) {
  return (
    <Row>
      <TouchableWithoutFeedback
        onPress={() => props.history.push('/give')}
      >
        <UIText>{'Dashboard'}</UIText>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.history.push('/give/now')}
      >
        <UIText>{'Give'}</UIText>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.history.push('/give/history')}
      >
        <UIText>{'History'}</UIText>
      </TouchableWithoutFeedback>
    </Row>
  );
}

GiveNavigator.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(GiveNavigator);
