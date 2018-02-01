import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '@ui/theme';
import { H3, H7, BodyText } from '@ui/typography';
import Paragraph from '@ui/Paragraph';
import Button, { ButtonLink } from '@ui/Button';
import Card, { CardImage, CardContent, CardActions } from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <ThemeProvider>
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
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('it should render a placeholder', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Card isLoading>
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
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
