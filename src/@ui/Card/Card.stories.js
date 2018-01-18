import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { H3, H7, BodyCopy } from '@ui/typography';
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
          <BodyCopy>{'A dark substance that turns "leave me alone" into "good morning!"'}</BodyCopy>
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
          <BodyCopy />
        </Paragraph>
      </CardContent>
      <CardActions>
        <Button />
        <ButtonLink />
      </CardActions>
    </Card>
  ));
