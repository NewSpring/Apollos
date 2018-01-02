import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import Avatar from './';

const source = { url: 'https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/member_images/members.nophoto_1000_1000_90_c1.jpg' };

describe('The Avatar component', () => {
  it('should render small', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Avatar
          source={source}
          size="small"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render medium', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Avatar
          source={source}
          size="medium"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render large', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Avatar
          source={source}
          size="large"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
