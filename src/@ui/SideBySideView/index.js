import { View } from 'react-native';
import { compose, renderComponent } from 'recompose';
import styled from '@ui/styled';
import { enhancer as mediaQuery } from '@ui/MediaQuery';

const SideBySideView = styled(({ reversed = false }) => ({
  flexDirection: reversed ? 'row-reverse' : 'row',
  flexWrap: 'no-wrap',
  alignItems: 'stretch',
}))(View);

const ResponsiveSideBySideView = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), renderComponent(SideBySideView)),
)(View);

export default ResponsiveSideBySideView;
