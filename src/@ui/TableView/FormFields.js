import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';

const FormFields = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 0.6,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(PaddedView);

export default FormFields;
