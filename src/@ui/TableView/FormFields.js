import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';

const FormFields = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 0.75,
  paddingBottom: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

export default FormFields;
