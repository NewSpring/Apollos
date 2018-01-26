import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { withProps, compose } from 'recompose';
import SafeAreaView from '@ui/SafeAreaView';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import TableView, { Cell, CellText, CellIcon, Divider } from '@ui/TableView';
import { Link } from '@ui/NativeWebRouter';
import Touchable from '@ui/Touchable';
import { H7 } from '@ui/typography';
import withUser from '@data/withUser';
import ImagePicker from '@ui/ImagePicker';

export { ProfileDetails, ProfileAddress, ChangePassword } from './forms';

const LogoutTouchable = compose(
  withUser,
  withProps(({ logout }) => ({ onPress: logout })),
)(Touchable);

const Arrow = withProps({
  name: 'arrow-next',
})(CellIcon);

const Settings = () => (
  <FlexedView>
    <Header titleText="Profile" backButton />
    <ScrollView>
      <SafeAreaView>
        <PaddedView horizontal={false}>
          <TableView>
            <Link to="/settings/profile">
              <Cell>
                <CellText>Personal Details</CellText>
                <Arrow />
              </Cell>
            </Link>
            <Divider />
            <Link to="/settings/address">
              <Cell>
                <CellText>My Address</CellText>
                <Arrow />
              </Cell>
            </Link>
            <Divider />
            <ImagePicker>
              <Cell>
                <CellText>Change Profile Photo</CellText>
                <Arrow />
              </Cell>
            </ImagePicker>
            <Divider />
            <Link to="/settings/password">
              <Cell>
                <CellText>Change Password</CellText>
                <Arrow />
              </Cell>
            </Link>
          </TableView>
          <TableView>
            <Touchable onPress={() => Linking.openURL('mailto:web.helpdesk@newspring.cc')}>
              <Cell>
                <CellText>Give Feedback</CellText>
                <Arrow />
              </Cell>
            </Touchable>
          </TableView>
          <TableView>
            <Link to="/give">
              <Cell>
                <CellText>Saved Accounts</CellText>
                <Arrow />
              </Cell>
            </Link>
            <Divider />
            <Link to="/give/schedules">
              <Cell>
                <CellText>Scheduled Contributions</CellText>
                <Arrow />
              </Cell>
            </Link>
            <Divider />
            <Link to="/give/history">
              <Cell>
                <CellText>Giving History</CellText>
                <Arrow />
              </Cell>
            </Link>
          </TableView>
          <TableView>
            <Link to="https://newspring.cc/privacy">
              <Cell>
                <CellText>Privacy Policy</CellText>
                <Arrow />
              </Cell>
            </Link>
            <Divider />
            <Link to="https://newspring.cc/terms">
              <Cell>
                <CellText>Terms of Use</CellText>
                <Arrow />
              </Cell>
            </Link>
          </TableView>

          <TableView>
            <LogoutTouchable>
              <Cell>
                <CellText>Logout</CellText>
                <Arrow />
              </Cell>
            </LogoutTouchable>
          </TableView>

          {process.env.APP_VERSION && (
            <H7>
              {process.env.APP_VERSION} - {process.env.APP_BUILD}
            </H7>
          )}
        </PaddedView>
      </SafeAreaView>
    </ScrollView>
  </FlexedView>
);

export default Settings;
