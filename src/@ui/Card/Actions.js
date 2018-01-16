import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';

const Actions = styled(({ theme }) => ({
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.sizing.baseUnit / 4,
}), 'Card.Actions')(PaddedView);

export default Actions;
