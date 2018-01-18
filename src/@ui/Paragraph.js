import { compose } from 'recompose';
import { View } from 'react-native';

import { withPlaceholder, Paragraph as ParagraphPlaceholder } from '@ui/Placeholder';
import styled from '@ui/styled';

const Paragraph = compose(
  styled(({ theme }) => ({
    paddingVertical: theme.sizing.baseUnit / 2,
  })),
  withPlaceholder(ParagraphPlaceholder),
)(View);

export default Paragraph;
