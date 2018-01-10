import { compose } from 'recompose';
import styled from '@ui/styled';
import { UIText } from '@ui/typography';
import { withButtonPlaceholder } from './Button';

const ButtonLink = compose(
  withButtonPlaceholder,
  styled(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    color: theme.colors.action.primary,
  }), 'Button.Link'),
)(UIText);

export default ButtonLink;
