import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

import Label from './Label';
import Indicator from './Indicator';

const withStyles = compose(
  styled(({ theme }) => ({
    backgroundColor: theme.colors.background.primary,
  }), 'TabBar'),
  withTheme(({ theme }) => ({ indicatorColor: theme.colors.background.secondary })),
);

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
    renderIndicator: Indicator,
  }),
)(TabBar);
