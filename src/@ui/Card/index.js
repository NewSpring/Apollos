import { compose } from 'recompose';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import CardWrapper from '@ui/CardWrapper';

export { default as CardImage } from './Image';
export { default as CardContent } from './Content';
export { default as CardActions } from './Actions';

const Card = compose(
  withIsLoading,
  styled(({ theme }) => ({
    marginHorizontal: theme.sizing.baseUnit / 2,
    marginVertical: theme.sizing.baseUnit / 4,
  })),
)(CardWrapper);

export default Card;
