import styled from '@ui/styled';
import { H6 } from '@ui/typography';

export default styled(({ theme, error, success }) => {
  const statusColor = {};
  if (success) statusColor.color = theme.colors.primary;
  if (error) statusColor.color = theme.colors.alert;
  return ({
    ...statusColor,
    textAlign: 'center',
    paddingBottom: theme.sizing.baseUnit / 2,
  });
})(H6);
