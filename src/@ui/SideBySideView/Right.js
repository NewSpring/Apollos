import { View, Platform } from 'react-native';
import { compose } from 'recompose';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';

export default compose(
  mediaQuery(({ md }) => ({ minWidth: md }), styled({
    width: '41.6666666%',
    height: '100%',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        maxHeight: '100vh',
      },
    }),
  }, 'SideBySideView.Right')),
)(View);
