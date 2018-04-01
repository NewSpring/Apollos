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

const giveSingleFundWithVisa = async ({
  sectionTab,
  giveSectionLink,
  firstContributionInput,
  reviewContributionButton,
  firstContributionInputLabel,
  paymentConfirmButton,
}) => {
  await expect(sectionTab).toBeVisible();
  await sectionTab.tap();

  await expect(giveSectionLink).toBeVisible();
  await giveSectionLink.tap();

  await expect(firstContributionInput).toBeVisible();
  await firstContributionInput.tap();
  await firstContributionInput.typeText('116.87');

  await expect(firstContributionInputLabel).toBeVisible();
  await firstContributionInputLabel.tap();

  await expect(reviewContributionButton).toBeVisible();
  await reviewContributionButton.tap();

  await waitFor(paymentConfirmButton) // eslint-disable-line
    .toBeVisible()
    .withTimeout(10000);
  await expect(paymentConfirmButton).toBeVisible();
  await paymentConfirmButton.tap();

  await waitFor(paymentConfirmButton) // eslint-disable-line
    .toBeVisible()
    .withTimeout(10000);
  await expect(paymentConfirmButton).toBeVisible();
  await paymentConfirmButton.tap();
};

describe('Giving Flows', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  // it('should login successfully', async () => {
  //   const el = await retrieveElements();
  //   await login(el);
  // });

  it('should give to a single fund with a visa', async () => {
    const el = await retrieveElements();
    await login(el);
    await giveSingleFundWithVisa(el);
  });
});
