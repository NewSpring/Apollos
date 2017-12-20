import styled from '@ui/styled';

const baseStyle = ({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  height: 30 + (theme.sizing.baseUnit / 2),
});

const textStyle = ({ theme }) => ({
  ...baseStyle({ theme }),
  lineHeight: 30,
  fontFamily: theme.typography.fontFamilySans,
});

export const withInputControlViewStyles = styled(baseStyle);
export const withInputControlTextStyles = styled(textStyle, 'Input.Control');

export default withInputControlTextStyles;
