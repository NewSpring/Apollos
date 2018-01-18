import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';
import styled from '@ui/styled';

import Label from './Label';
import Indicator from './Indicator';

const withStyles = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.primary,
}), 'TabBar');

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
    renderIndicator: Indicator,
  }),
)(TabBar);
