import { View } from 'react-native';
import { compose, withProps } from 'recompose';
import styled from '@ui/styled';
import { H4, H6 } from '@ui/typography';
import Button from '@ui/Button';

export const Title = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H4);

export const Row = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})(View);

export const TinyButton = compose(
  styled(({ theme }) => ({
    borderColor: theme.colors.text.tertiary,
    height: theme.sizing.baseUnit * 1.5,
    paddingHorizontal: theme.sizing.baseUnit * 0.75,
    borderWidth: 1,
  })),
  withProps({ bordered: true }),
)(Button);

export const TinyButtonText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);
