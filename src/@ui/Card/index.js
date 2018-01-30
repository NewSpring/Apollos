import { compose } from 'recompose';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import CardWrapper from '@ui/CardWrapper';

import { enhancer as mediaQuery } from '@ui/MediaQuery';

export { default as CardImage } from './Image';
export { default as CardContent } from './Content';
export { default as CardActions } from './Actions';

const Card = compose(
  withIsLoading,
  mediaQuery(({ md }) => ({ maxWidth: md }),
    styled(({ theme }) => ({ // mobile
      marginHorizontal: theme.sizing.baseUnit / 2,
      marginVertical: theme.sizing.baseUnit / 4,
    })),
    styled(({ theme }) => ({ // desktop / tablet
      marginHorizontal: theme.sizing.baseUnit,
      marginVertical: theme.sizing.baseUnit / 4,
    })),
  ),
)(CardWrapper);

export default Card;
