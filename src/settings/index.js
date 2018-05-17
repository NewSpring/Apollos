import React from 'react';
import { ScrollView, Linking, Platform } from 'react-native';
import { withProps, compose } from 'recompose';
import reload from '@utils/reload';
import SafeAreaView from '@ui/SafeAreaView';
import PaddedView from '@ui/PaddedView';
import TableView, { Cell, CellText, CellIcon, Divider } from '@ui/TableView';
import { Link, withRouter } from '@ui/NativeWebRouter';
import Touchable from '@ui/Touchable';
import { H7 } from '@ui/typography';
import withUser from '@data/withUser';
import { withShowOnboarding } from '@data/withOnboarding';
import UploadProfileImageForm from '@ui/forms/UploadProfileImageForm';

import Layout from './Layout';

export { ProfileDetails, ProfileAddress, ChangePassword } from './forms';

const feedbackLink = 'mailto:web.helpdesk@newspring.cc';
const handleFeedback = () => {
  if (Platform.OS === 'web') {
    window.location.href = feedbackLink;
  } else {
    Linking.openURL(feedbackLink);
  }
};


const LogoutTouchable = compose(
  withUser,
  withRouter,
  withProps(({ logout }) => ({
    async onPress() {
      await logout();
      if (Platform.OS === 'web') reload();
    },
  })),
)(Touchable);

const ShowOnboardingTouchable = compose(
  withShowOnboarding,
  withProps(({ showOnboarding }) => ({ onPress: showOnboarding })),
)(Touchable);

const Arrow = withProps({
  name: 'arrow-next',
})(CellIcon);

const Settings = () => (
  <Layout title="Settings">
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
            <UploadProfileImageForm>
              <Cell>
                <CellText>Change Profile Photo</CellText>
                <Arrow />
              </Cell>
            </UploadProfileImageForm>
            <Divider />
            <Link to="/settings/password">
              <Cell>
                <CellText>Change Password</CellText>
                <Arrow />
              </Cell>
            </Link>
          </TableView>
          <TableView>
            <Touchable onPress={handleFeedback}>
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
            <Link to="/give">
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

          {Platform.OS !== 'web' ? (
            <TableView>
              <ShowOnboardingTouchable>
                <Cell>
                  <CellText>Show Onboarding</CellText>
                  <Arrow />
                </Cell>
              </ShowOnboardingTouchable>
              <Divider />
              <LogoutTouchable>
                <Cell>
                  <CellText>Logout</CellText>
                  <Arrow />
                </Cell>
              </LogoutTouchable>
            </TableView>
          ) : (
            <TableView>
              <LogoutTouchable>
                <Cell>
                  <CellText>Logout</CellText>
                  <Arrow />
                </Cell>
              </LogoutTouchable>
            </TableView>
          )}

          {process.env.APP_VERSION && (
            <H7>
              {process.env.APP_VERSION} - {process.env.APP_BUILD}
            </H7>
          )}
        </PaddedView>
      </SafeAreaView>
    </ScrollView>
  </Layout>
);

export default Settings;
