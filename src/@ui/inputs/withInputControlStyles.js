import { Platform } from 'react-native';
import styled from '@ui/styled';

const baseStyle = ({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  height: 30 + (theme.sizing.baseUnit / 2),
  ...Platform.select({
    web: {
      outline: 'none',
    },
  }),
});

const textStyle = ({ theme }) => ({
  ...baseStyle({ theme }),
  lineHeight: 30,
  fontSize: theme.helpers.rem(0.875),
  fontFamily: theme.typography.fontFamilySans.bold.default,
  color: theme.colors.text.primary,
});

export const withInputControlViewStyles = styled(baseStyle);
export const withInputControlTextStyles = styled(textStyle, 'Input.Control');

export default withInputControlTextStyles;
