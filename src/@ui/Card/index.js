import PropTypes from 'prop-types';
import { compose, withContext } from 'recompose';

import styled from '@ui/styled';
import CardWrapper from '@ui/CardWrapper';

export { default as CardImage } from './Image';
export { default as CardText } from './TextLine';
export { default as CardParagraph } from './Paragraph';
export { default as CardContent } from './Content';

const Card = compose(
  withContext(
    { isLoading: PropTypes.bool },
    ({ isLoading }) => ({ isLoading }),
  ),
  styled(({ theme }) => ({
    marginHorizontal: theme.sizing.baseUnit / 2,
    marginVertical: theme.sizing.baseUnit / 4,
  })),
)(CardWrapper);

export default Card;
