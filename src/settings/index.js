import React from 'react';
import { ScrollView } from 'react-native';
import { withProps } from 'recompose';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import TableView, { Cell, CellText, CellIcon, Divider } from '@ui/TableView';

const Arrow = withProps({
  name: 'arrow-next',
})(CellIcon);

const Settings = () => (
  <FlexedView>
    <Header titleText="Profile" backButton />
    <ScrollView>
      <TableView>
        <Cell>
          <CellText>Personal Details</CellText>
          <Arrow />
        </Cell>
        <Divider />
        <Cell>
          <CellText>My Address</CellText>
          <Arrow />
        </Cell>
        <Divider />
        <Cell>
          <CellText>Change Profile Photo</CellText>
          <Arrow />
        </Cell>
        <Divider />
        <Cell>
          <CellText>Change Password</CellText>
          <Arrow />
        </Cell>
      </TableView>
    </ScrollView>
  </FlexedView>
);

export default Settings;
