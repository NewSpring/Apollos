import { H7 } from '@ui/typography';
import styled from '@ui/styled';

const CellText = styled(({ theme }) => ({
  flexGrow: 1,
  flexShrink: 1,
  paddingLeft: theme.sizing.baseUnit / 2,
  paddingRight: theme.sizing.baseUnit / 2,
}))(H7);

export default CellText;
