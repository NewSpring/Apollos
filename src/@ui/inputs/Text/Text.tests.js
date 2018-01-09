import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '@ui/TestProviders';

import Icon from '@ui/Icon';
import Text from './';

describe('The Text Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Text
          editable
          label="Some label text"
          placeholder="Some placeholder"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a password field with an icon', () => {
    const tree = renderer.create(
      <Providers>
        <Text
          editable
          type="password"
          label="Password"
          placeholder="Some placeholder"
          suffix={<Icon name="lock" size={18} />}
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as an email field', () => {
    const tree = renderer.create(
      <Providers>
        <Text
          editable
          type="email"
          label="Email"
          placeholder="Some placeholder"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a numeric field', () => {
    const tree = renderer.create(
      <Providers>
        <Text
          editable
          type="numeric"
          label="Numeric"
          placeholder="Some placeholder"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a phone number field', () => {
    const tree = renderer.create(
      <Providers>
        <Text
          type="phone"
          label="Phone Number"
          placeholder="Some placeholder"
        />
      </Providers>,
    );
    expect(tree).toMatchSnapshot();
  });
});
