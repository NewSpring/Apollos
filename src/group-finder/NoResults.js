import React from 'react';
import { Linking } from 'react-native';
import Card, { CardContent } from '@ui/Card';
import { BodyText } from '@ui/typography';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';

const Link = styled(({ theme }) => ({ color: theme.colors.primary }))(BodyText);
const StyledBodyText = styled({ textAlign: 'center' })(BodyText);

const AdUnit = () => (
  <Card>
    <CardContent>
      <PaddedView>
        <StyledBodyText italic>
          {'Unfortunately, we didn\'t find any groups matching your search. Gather some friends, and '}
          <Link onPress={() => Linking.openURL('https://rock.newspring.cc/workflows/81')}>start your own group</Link>
          {' !'}
        </StyledBodyText>
      </PaddedView>
    </CardContent>
  </Card>
);

export default AdUnit;
