import React from 'react';
import { Text } from 'react-native';
import FlexedView from './FlexedView';

const DebugView = (props) => {
  // Log out props for debugging:
  console.log('Debug View', props); // eslint-disable-line no-console
  return (
    <FlexedView>
      <Text>
        {JSON.stringify(props)}
      </Text>
    </FlexedView>
  );
};

export default DebugView;
