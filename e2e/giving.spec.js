import { reloadApp } from 'detox-expo-helpers';
import elements from './elements';

const retrieveElements = async () => elements(element, by); // eslint-disable-line

const login = async ({
  homeTab,
  loginEmailInput,
  loginPasswordInput,
  loginFormGoButton,
  profileTab,
  welcomeBanner,
}) => {
  // Wait for Home tab to display
  await waitFor(homeTab) // eslint-disable-line
    .toBeVisible()
    .withTimeout(10000);
  await expect(homeTab).toBeVisible();
  await profileTab.tap();

  // Check to see if the Email Input is visible, tap it, and type in the email address.
  await expect(loginEmailInput).toBeVisible();
  await loginEmailInput.tap();
  await loginEmailInput.typeText('aaron.attendee@newspring.cc');

  // Check to see if the Password Input is visible, tap it, and type in the password.
  await expect(loginPasswordInput).toBeVisible();
  await loginPasswordInput.tap();
  await loginPasswordInput.typeText('newspring');

  // Hide keyboard
  await expect(welcomeBanner).toBeVisible();
  await welcomeBanner.tap();

  // Click the Go button to login
  await expect(loginFormGoButton).toBeVisible();
  await loginFormGoButton.tap();
};

const giveSingleFundWithVisa = async ({ sectionTab }) => {
  await expect(sectionTab).toBeVisible();
  await sectionTab.tap();
};

describe('Giving Flows', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should login successfully', async () => {
    const el = await retrieveElements();
    await login(el);
  });

  it('should give to a single fund with a visa', async () => {
    const el = await retrieveElements();
    await login(el);
    await giveSingleFundWithVisa(el);
  });
});
