import { View } from 'react-native';
import { nest } from 'recompose';
import { H5 } from '@ui/typography';
import styled from '@ui/styled';

const Row = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: theme.sizing.baseUnit / 2,
  marginTop: theme.sizing.baseUnit * 2,
  marginBottom: theme.sizing.baseUnit,
}))(View);

const StyledH5 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H5);

export default nest(Row, StyledH5);
