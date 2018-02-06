import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { H3, H7, BodyText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import Button, { ButtonLink } from '@ui/Button';

import Card, { CardActions, CardContent, CardImage } from './';

storiesOf('Card', module)
  .add('simple', () => (
    <Card>
      <CardImage source={'https://picsum.photos/600/400/?image=63'} />
      <CardContent>
        <H3>Coffee</H3>
        <H7>noun</H7>
        <Paragraph>
          <BodyText>{'A dark substance that turns "leave me alone" into "good morning!"'}</BodyText>
        </Paragraph>
      </CardContent>
      <CardActions>
        <Button title="Learn More" />
        <ButtonLink>Share</ButtonLink>
      </CardActions>
    </Card>
  ))
  .add('loading', () => (
    <Card isLoading>
      <CardImage />
      <CardContent>
        <H3 />
        <H7 />
        <Paragraph>
          <BodyText />
        </Paragraph>
      </CardContent>
      <CardActions>
        <Button />
        <ButtonLink />
      </CardActions>
    </Card>
  ));
