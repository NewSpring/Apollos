import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import Card, { CardContent } from '@ui/Card';
import styled from '@ui/styled';
import { withProtectedFunction } from '@ui/NativeWebRouter';
import withIsLoggedIn from '@data/withUser/withIsLoggedIn';
import { H5 } from '@ui/typography';
import Button from '@ui/Button';
import PaddedView from '@ui/PaddedView';
import Spacer from '@ui/Spacer';

const enhance = compose(
  withIsLoggedIn,
  branch(({ isLoading, isLoggedIn }) => (isLoading || isLoggedIn), renderNothing),
  withProtectedFunction(protect => ({
    triggerLogin: () => protect(() => {}),
  })),
);

const StyledCardContent = styled({ alignItems: 'center' })(CardContent);
const Title = styled({ textAlign: 'center' })(H5);

const LoginPromptCard = enhance(({
  prompt,
  triggerLogin,
}) => (
  <Card>
    <StyledCardContent>
      <PaddedView>
        <Title>{prompt}</Title>
      </PaddedView>
      <Button onPress={triggerLogin} title="Sign in or Create Account" />
      <Spacer />
    </StyledCardContent>
  </Card>
));

export default LoginPromptCard;
