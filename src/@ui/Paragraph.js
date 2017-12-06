import { BodyCopy } from '@ui/typography';
import styled from '@ui/styled';

const Paragraph = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 2,
}))(BodyCopy);

export default Paragraph;
