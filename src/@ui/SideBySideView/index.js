import { View } from 'react-native';
import { compose, renderComponent } from 'recompose';
import styled from '@ui/styled';
import { enhancer as mediaQuery } from '@ui/MediaQuery';

export { default as Right } from './Right';
export { default as Left } from './Left';

const SideBySideView = styled(({ reversed = false, stretched = true }) => ({
  flexDirection: reversed ? 'row-reverse' : 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: stretched ? 'stretch' : 'center',
}))(View);

const ResponsiveSideBySideView = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), renderComponent(SideBySideView)),
)(View);

export {
  SideBySideView as default,
  ResponsiveSideBySideView,
};
