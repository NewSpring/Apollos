import React from 'react';

import Card, { CardContent } from '@ui/Card';
import { H4 } from '@ui/typography';
import { Link } from '@ui/NativeWebRouter';
import Button from '@ui/Button';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';

const Text = styled({ textAlign: 'center' })(H4);

const AdUnit = () => (
  <Card>
    <CardContent>
      <PaddedView>
        <Text>{"Can't find what you're looking for, or want to start your own group?"}</Text>
      </PaddedView>
      <Link
        bordered
        title="Contact us"
        component={Button}
        to="https://rock.newspring.cc/workflows/81"
      />
    </CardContent>
  </Card>
);

export default AdUnit;
