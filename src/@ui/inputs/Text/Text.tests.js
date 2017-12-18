import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@ui/theme';

import Icon from '@ui/Icon';
import Text from './';

describe('The Text Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Text
          editable
          label="Some label text"
          placeholder="Some placeholder"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a password field with an icon', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Text
          editable
          type="password"
          label="Password"
          placeholder="Some placeholder"
          suffix={<Icon name="lock" size={18} />}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as an email field', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Text
          editable
          type="email"
          label="Email"
          placeholder="Some placeholder"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a numeric field', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Text
          editable
          type="numeric"
          label="Numeric"
          placeholder="Some placeholder"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a phone number field', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Text
          type="phone"
          label="Phone Number"
          placeholder="Some placeholder"
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
