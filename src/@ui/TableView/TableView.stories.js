import React from 'react';
import { storiesOf } from '@storybook/react-native';
import FlexedView from '@ui/FlexedView';

import Icon from '@ui/Icon';
import { Switch } from '@ui/inputs';
import TableView, { Cell, CellText, Divider } from './';

storiesOf('TableView', module)
  .add('default', () => (
    <FlexedView>
      <TableView>
        <Cell>
          <Icon name="leaf-outline" />
          <CellText>Line Item</CellText>
        </Cell>
        <Divider />
        <Cell>
          <Icon name="camera" />
          <CellText>A toggle!</CellText>
          <Switch />
        </Cell>
        <Divider />
        <Cell>
          <CellText>Just a row</CellText>
        </Cell>
        <Divider />
        <Cell>
          <CellText>This be some button!</CellText>
          <Icon name="arrow-next" />
        </Cell>
      </TableView>
    </FlexedView>
  ));
