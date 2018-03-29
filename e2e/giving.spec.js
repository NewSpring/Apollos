const { reloadApp } = require('detox-expo-helpers');

const navigateToGiving = async () => {
  await waitFor(element(by.id('homeTab')))
    .toBeVisible()
    .withTimeout(10000);
  await expect(element(by.id('homeTab'))).toBeVisible();
  await element(by.id('sectionTab')).tap();
  // TODO: navigate to giving
};

const login = async () => {
  // Wait for Home tab to display
  await waitFor(element(by.id('homeTab')))
    .toBeVisible()
    .withTimeout(10000);
  await expect(element(by.id('homeTab'))).toBeVisible();
  await element(by.id('profileTab')).tap();

  // Check to see if the Email Input is visible, tap it, and type in the email address.
  await expect(element(by.id('loginForm').withDescendant(by.label('Email')))).toBeVisible();
  await element(by.id('loginForm').withDescendant(by.label('Email'))).tap();
  await element(by.id('loginForm').withDescendant(by.label('Email'))).typeText(
    'aaron.attendee@newspring.cc',
  );

  // Check to see if the Password Input is visible, tap it, and type in the password.
  await expect(element(by.id('loginForm').withDescendant(by.label('Password')))).toBeVisible();
  await element(by.id('loginForm').withDescendant(by.label('Password'))).tap();
  await element(by.id('loginForm').withDescendant(by.label('Password'))).typeText('newspring');

  // Click the Go button to login
  await expect(element(by.id('loginForm').withDescendant(by.text('Go')))).toBeVisible();
  await element(by.id('loginForm').withDescendant(by.text('Go'))).tap();
};

describe('Giving', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should load the home screen', async () => {
    await login();
    // await navigateToGiving();
  });

  // it('should navigate to giving', async () => {
  //   await login();
  //   await navigateToGiving();
  // });
});
