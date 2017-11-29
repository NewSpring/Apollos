import React from 'react';
import { Text } from 'react-native';
import FlexedView from './FlexedView';

const DebugView = (props) => {
  console.log('Debug View', props);
  return (
    <FlexedView>
      <Text>
        {JSON.stringify(props)}
      </Text>
    </FlexedView>
  );
};

export default DebugView;
