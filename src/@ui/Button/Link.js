import styled from '@ui/styled';
import { UIText } from '@ui/typography';

const ButtonLink = styled(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: 0,
  borderRadius: 0,
  color: theme.colors.action.primary,
}), 'Button.Link')(UIText);

export default ButtonLink;
