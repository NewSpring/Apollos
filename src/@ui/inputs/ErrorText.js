import { H6 } from '@ui/typography';
import styled from '@ui/styled';

const ErrorText = styled(({ theme }) => ({
  color: theme.colors.alert,
  paddingTop: theme.sizing.baseUnit / 2,
}))(H6);

export default ErrorText;
