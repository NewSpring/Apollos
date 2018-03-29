import { reloadApp } from 'detox-expo-helpers';
import elements from './elements';

const retrieveElements = async () => elements(element, by);

const login = async ({
  homeTab,
  loginEmailInput,
  loginPasswordInput,
  // loginFormGoButton,
  profileTab,
}) => {
  // Wait for Home tab to display
  await waitFor(homeTab)
    .toBeVisible()
    .withTimeout(10000);
  await expect(homeTab).toBeVisible();
  await profileTab.tap();

  // // Check to see if the Email Input is visible, tap it, and type in the email address.
  await expect(loginEmailInput).toBeVisible();
  await loginEmailInput.tap();
  await loginEmailInput.typeText('aaron.attendee@newspring.cc');

  // Check to see if the Password Input is visible, tap it, and type in the password.
  await expect(loginPasswordInput).toBeVisible();
  await loginPasswordInput.tap();
  await loginPasswordInput.typeText('newspring');

  // Click the Go button to login
  // await expect(loginFormGoButton).toBeVisible();
  // await loginFormGoButton.tap();
};

describe('Giving', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should load the home screen', async () => {
    const el = await retrieveElements();
    await login(el);
  });
});
